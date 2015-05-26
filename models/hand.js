var bookshelf = require('./bookshelf');
var PE = require('poker-eval');

var Hand = bookshelf.Model.extend({
  tableName: 'hands',
  winners: function(board) {
    var players = this.get('players');
    players.forEach(function(player) {
      var hand = new PE.Hand(board.concat(player['holeCards']));
      player['handValue'] = hand.value;
      player['handType'] = PE.Hand.Types[hand.type];
    });
    var maxValue = Math.max.apply(Math, players.map(function(p) { return p['handValue']; }));
    return players.filter(function(p) {
      return p['handValue'] == maxValue;
    });
  },
  state: function(street) {
    var streetValues = {
      'preflop': { value: 0, next: 'flop'},
      'flop': { value: 1, next: 'turn' },
      'turn': { value: 2, next: 'river' },
      'river': { value: 3, next: 'preflop' }
    };
    var streetValue = streetValues[street]['value'];
    var nextStreet = streetValues[street]['next'];
    var board = [];
    if (streetValue > 0) {
      board = board.concat(this.get('flop'))
    }
    if (streetValue > 1) {
      board = board.concat(this.get('turn'))
    }
    if (streetValue > 2) {
      board = board.concat(this.get('river'))
      var winners = this.winners(board);
    }
    var resp = {
      handId: this.get('id'),
      street: nextStreet,
      players: this.get('players'),
      board: board
    };
    if (typeof winners != 'undefined') {
      resp['winners'] = winners;
    }
    return resp;
  }
});

module.exports = Hand;