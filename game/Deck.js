/**
 * The Deck class representing a Deck
 * 4x13 Matrix
*/
class Deck {
    /**
     * Makes decks of 52 cards.
     * @param {number}  numOfDecks  number of decks required for the game.
     * 
     */
    constructor(numOfDecks){

        // assigning 4 suits to make a deck
        this.cards = [];

        // intializing the deck
        let singleSuit = [];

        for(let j = 0; j < 4; j++){
            for(let i = 0; i < 13; i++){
                singleSuit.push(0);
            }
            this.cards.push(singleSuit);
            singleSuit = [];
        }
        

        // assigning how many decks are required
        this.decksCount = numOfDecks;

        // no cards delt at the time of construction
        this.deltCardsCount = 0;
    }

    /**
     * deals a card from the deck
     * 
     * @returns {string}
     */
    getCard() {
        //gen a rand num in range of [0, 3] choosing suit
        let randSuit = Math.floor(Math.random() * 4);

        //gen a rand num in range of [0, 12] choosing card
        let randCard = Math.floor(Math.random() * 13);

        // if not all instances of that specific card are delt
        if (this.cards[randSuit][randCard] < this.decksCount){
            // inc that card's delt count
            this.cards[randSuit][randCard] = this.cards[randSuit][randCard] + 1;
            // inc total delt count
            this.deltCardsCount++;
            //return
            return [randSuit, randCard].join("-");
        } else { // if all is delt, try another card;
            return this.getCard();
        }
    }

    /**
     * Shuffles the deck of cards
     */
    shuffle() {
        this.deltCardsCount = 0;
        this.cards.forEach((suit) =>{
            suit.fill(0);
        })
    }
};


module.exports = Deck;