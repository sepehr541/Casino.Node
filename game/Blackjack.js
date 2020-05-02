var Player = require("./Player"); 
var Deck = require("./Deck")
var { EmptyTable } = require("./CustomErrors");

class Blackjack{

    /**
     * Blackjack
     * Create a game of BlackJack
     */
    constructor(){
        this.size = 7;
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
     * 
     * @param {Player[]} players active players of table
     */
    start(dealerHand, players, bets, hands) {
        // initial round of giving cards
        this.dealAll(dealerHand, players, bets, hands);

        let occupiedSeatIndice = this.isAllNull(players);
        currentPlayer = occupiedSeatIndice[0];
        //players act from right to left of table
        players.forEach(player => {
            while(currentPlayer = player.getSeat()) {
                
            }
        });
        // dealer reveals and then acts accordingly

    }

    /**
     * Initial dealing of hands
     * Two cards per player
     * Order: from right to left ending with dealer each round
     * 
     * @param players 
     * @param hands 
     */
    dealAll(dealerHand, players, bets, hands){
        for(let i = 0; i < 2; i++){
            for (let pID of bets.keys()){
                hands.get(pID).push(this.deck.getCard());
            }
            dealerHand.push(this.deck.getCard());
        }

        // not sure what this part is doing

        let firstPlayer = 0;
        try{
            firstPlayer = this.getFirstPlayer(players);
        }
        catch(error){
            return 0;
        }

        return firstPlayer;
    }

    /**
     * Hit a player
     */
    dealPlayer(playerID, hands) {
        hands.get(playerID).push(this.deck.getCard());
    }


    /**
     * Stay will simply skip to the next player without 
     * giving the player extra cards
     * 
     */
    skipPlayer(currentPlayer, players) {
        return this.getNextPlayer(players, currentPlayer);
    }

    clearAll(){

    }

    /**
     * get first player in turn
     * @param players 
     */
    getFirstPlayer(players){
        for(let i = 0; i < players.length; i++){
            if(players[i] !== null){
                return i;
            }
        }
        throw new EmptyTable("This table is empty");
    }


    /**
     * get next player according to rules of the game
     * 
     * @param {number} currentPlayer
     * @param {Player[]} players
     */
    getNextPlayer(players, currentPlayer){
        for(let i = (currentPlayer + 1) % players.length; i < players.length; i++){
            if(players[i] !== null) {
                return i;
            }       
        }
        return currentPlayer + 1;
    }

    /**
     * Sum the value of a player's hand
     * @param {string[]} hand 
     */
    sumHand(hand) {
        let sum = 0;
        let cards = [];
        let hasAce = false
        hand.forEach(card => {
            let rank = parseInt(card.substr(1)) + 1;
            cards.push(rank); //plus one to compensate 0-based indexing
            if (rank  === 1){
                hasAce = true;
            }
        });

        for (let card of cards){
            if(card === 1 && sum + 11 > 21){ // Ace as 1
                sum++;
            } else if (card === 1 && sum + 11 <= 21){ // Ace as 1
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