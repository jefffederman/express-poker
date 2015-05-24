var bookshelf = require('./bookshelf');

var Hand = bookshelf.Model.extend({
  tableName: 'hands',
  cards: function(street) {
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
    }
    return {
      handId: this.get('id'),
      street: nextStreet,
      player1: this.get('hole_cards_1'),
      player2: this.get('hole_cards_2'),
      board: board
    };
  }
});

module.exports = Hand;