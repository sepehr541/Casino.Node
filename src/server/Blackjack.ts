import {Game} from "./Game";
import { Player } from "./Player";
import { Deck } from "./Deck";
import { EmptyTable } from "./CustomErrors";

export class Blackjack implements Game {

    // properties:
    size: number;    decksRequired: number;

    deck: Deck;

    // functions:

    /**
     * Blackjack
     */
    constructor(){
        this.size = 7;
        this.decksRequired = 6;
        this.deck = new Deck(6);
    }

    /**
     * returns the indice of non-null elements, 
     * empty if all is null
     * @param array 
     * @returns {number[]}
     */
    isAllNull(array): number[] {
        let res = [];
        for(let i = 0; i < array.length; i++){
            if(array[i] !== null)
                res.push(i);
        }
        return res;
    }

    /**
     * Deals players Two cards 
     * Must be called at the beginning of each round
     * 
     * @param players 
     * @param hands 
     */
    dealAll(dealerHand: string[], players: Player[], bets: Map<string, number> , hands: Map<string, string[]>){
        for(let i = 0; i < 2; i++){
            for (let pID of bets.keys()){
                hands.get(pID).push(this.deck.getCard());
            }
            dealerHand.push(this.deck.getCard());
        }

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
    dealPlayer(playerID: string, hands: Map<string, string[]>) {
        hands.get(playerID).push(this.deck.getCard());
    }


    /**
     * Stay will simply skip to the next player without 
     * giving the player extra cards
     * 
     */
    skipPlayer(currentPlayer, players): number{
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
    getNextPlayer(players: Player[], currentPlayer:number): number{
        for(let i = (currentPlayer + 1)% players.length; i < players.length; i++){
            if(players[i] !== null){
                return i;
            }       
        }
        return currentPlayer + 1;
    }

    sumHand(hand: string[]){
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

}