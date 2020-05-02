/**
 * Mapping of deck indices to actual cards
 */

/**
 * 0 : Spades
 * 1 : Clubs
 * 2 : Hearts
 * 3 : Diamonds
 */
const Suit = ['\u2660', '\u2663', '\u2665', '\u2666']
Object.freeze(Suit);

/**
 * 0 : ACE
 * 2, ... ,10 : Own -1
 * 10 : Jack
 * 11 : Queen
 * 12 : KING 
 */
const Rank = [ 'A', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', 'J', 'Q', 'K'];
module.exports = {
    Suit,
    Rank
};