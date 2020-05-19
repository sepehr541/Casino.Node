var Player = require("./Player"); 
var Deck = require("./Deck")
var { EmptyTable } = require("./CustomErrors");

class Blackjack{

    /**
     * Blackjack
     * Create a game of BlackJack
     */
    constructor(){
        this.size = 3;
        this.decksRequired = 6;
        this.deck = new Deck(6);
    }

    /**
     * @returns {Number} size of game
     */
    getSize() {
        return this.size;
    }
    
    /**
     * Initial dealing of hands
     * Two cards per player
     * Order: from right to left ending with dealer each round
     * 
     * @param players 
     * @param hands 
     */
    dealAll(dealerHand, bets, hands){
        for(let i = 0; i < 2; i++){
            for (let [k, v] of bets) {
                if (v)
                    hands.get(k).push(this.deck.getCard());
            }
            dealerHand.push(this.deck.getCard());
        }
    }

    /**
     * Hit a player
     */
    dealPlayer(playerId, hands) {
        hands.get(playerId).push(this.deck.getCard());
    }

    dealDealer(dealerHand) {
        dealerHand.push(this.deck.getCard());
    }


    /**
     * Stay will simply skip to the next player without 
     * giving the player extra cards
     * 
     */
    skipPlayer(currentPlayer, players) {
        return this.getNextPlayer(players, currentPlayer);
    }

    /**
     * Sum the value of a player's hand
     * @param {string[]} hand 
     */
    sumHand(hand) {
        // initial sum
        let sum = 0;
        // rank cards saved in this
        let cards = [];

        // if we have ace or not, as ace can be either 1 or 11
        let hasAce = false;

        hand.forEach(card => {
            let rank = parseInt(card.split('-')[1]) + 1;
            cards.push(rank);
        });

        for (let card of cards){
            if(card === 1 && sum + 11 > 21){ // Ace as 0
                sum++;
            } else if (card === 1 && sum + 11 <= 21){ // Ace as 0
                sum += 11
            } else if(card >= 10){ // 10 and face cards 
                if(!hasAce){
                    sum += 10;
                }
            } else { // other cards
                sum += card;
            }
        }
        return sum;
    }

    // Helpers
    /**
     * returns the indice of non-null elements, 
     * empty if all is null
     * @param array 
     * @returns {number[]}
     */
    isAllNull(array) {
        let res = [];
        for(let i = 0; i < array.length; i++){
            if(array[i] !== null)
                res.push(i);
        }
        return res;
    }
}

module.exports = Blackjack;