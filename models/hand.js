var bookshelf = require('./bookshelf');

var Hand = bookshelf.Model.extend({
  tableName: 'hands',
  cards: function(street) {
    var streetValues = {
      'preflop': 0,
      'flop': 1,
      'turn': 2,
      'river': 3
    };
    var streetValue = streetValues[street];
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
      player1: this.get('hole_cards_1'),
      player2: this.get('hole_cards_2'),
      board: board
    };
  }
});

module.exports = Hand;