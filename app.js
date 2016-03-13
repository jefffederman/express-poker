var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
var SimpleDeck = require('./models/simple_deck');
var Hand = require('./models/hand');
var _ = require('underscore');

app.post('/hands', function (req, res) {
  var deck = new SimpleDeck();
  deck.shuffle();
  var players = _.times(req.body.playerCount, function(i) {
    return { name: 'player' + (i+1), holeCards: deck.deal('holeCards') };
  });
  Hand.forge({
    players: JSON.stringify(players),
    flop: JSON.stringify(deck.deal('flop')),
    turn: JSON.stringify(deck.deal('turn')),
    river: JSON.stringify(deck.deal('river')),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  })
  .save()
  .then(function(hand) {
    res.redirect('/hands/' + hand.get('id') + '/preflop');
  })
  .catch(function(e) {
    res.send(e);
  });
});

app.get('/hands/:hand_id/:street', function(req, res) {
  new Hand({id: req.params.hand_id})
  .fetch()
  .then(function(hand) {
    var handState = setFormActionAndMethod(hand.state(req.params.street), req.headers.host);
    res.json(handState);
  });
});

app.get('/hands/:hand_id', function(req, res) {
  new Hand({id: req.params.hand_id})
  .fetch()
  .then(function(hand) {
    res.json(hand);
  });
});

app.listen(3000, function() {
  console.log('Running express_poker server on port 3000…');
});

// Helpers

function setFormActionAndMethod(handState, host) {
  handState['httpMethod'] = handState['street'] == 'preflop' ? 'POST' : 'GET';
  var fullHost = 'http://' + host + '/hands';
  handState['formAction'] = handState['street'] == 'preflop' ? fullHost : fullHost + '/' + handState['handId'] + '/' + handState['street'];
  return handState;
}