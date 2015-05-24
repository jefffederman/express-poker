var _ = require('underscore');

var SimpleDeck = function() {
  var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  var suits = ['c', 'd', 'h', 's'];
  var cards = [];
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      cards.push(rank + suit);
    });
  });
  this.cards = cards;
};

SimpleDeck.prototype.dealCard = function() {
  return this.cards.shift();
};

SimpleDeck.prototype.deal = function(street) {
  var numCards = {
    'holeCards': 2,
    'flop': 3,
    'turn': 1,
    'river': 1,
  }[street];
  var self = this;
  return _.times(numCards, function() {
    return self.dealCard();
  });
}

SimpleDeck.prototype.shuffle = function() {
  var shuffled = [];
  while(this.cards.length) {
    var randomIndex = Math.floor(Math.random() * this.cards.length);
    var element = this.cards.splice(randomIndex, 1);
    shuffled.push(element[0]);
  }
  this.cards = shuffled;
  return this;
};

module.exports = SimpleDeck;