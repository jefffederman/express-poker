var express = require('express');
var app = express();
var SimpleDeck = require('./models/simple_deck');
var Hand = require('./models/hand');

app.post('/hands', function (req, res) {
  var deck = new SimpleDeck();
  deck.shuffle();
  Hand.forge({
    hole_cards_1: JSON.stringify(deck.deal('holeCards')),
    hole_cards_2: JSON.stringify(deck.deal('holeCards')),
    flop: JSON.stringify(deck.deal('flop')),
    turn: JSON.stringify(deck.deal('turn')),
    river: JSON.stringify(deck.deal('river'))
  })
  .save()
  .then(function(hand) {
    res.redirect('/hands/' + hand.get('id') + '/preflop');
  })
  .catch(function(e) {
    res.send(e);
  });
});

app.get('/hands/:hand_id/preflop', function(req, res) {
  new Hand({id: req.params.hand_id})
  .fetch()
  .then(function(hand) {
    res.json(hand.cards('preflop'));
  });
});

app.get('/hands/:hand_id/flop', function(req, res) {
  new Hand({id: req.params.hand_id})
  .fetch()
  .then(function(hand) {
    res.json(hand.cards('flop'));
  });
});

app.get('/hands/:hand_id/turn', function(req, res) {
  new Hand({id: req.params.hand_id})
  .fetch()
  .then(function(hand) {
    res.json(hand.cards('turn'));
  });
});

app.get('/hands/:hand_id/river', function(req, res) {
  new Hand({id: req.params.hand_id})
  .fetch()
  .then(function(hand) {
    res.json(hand.cards('river'));
  });
});

app.get('/hands/:hand_id', function(req, res) {
  var hand = new Hand({id: req.params.hand_id})
    .fetch()
    .then(function(hand) {
      res.json(hand);
    });
});

app.listen(3000, function() {
  console.log('Running express_poker server on port 3000…');
});