import {Game} from "./Game";
import { Player } from "./Player";
import { Deck } from "./Deck";

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
     * Deals players Two cards 
     * Must be called at the beginning of each round
     * 
     * @param players 
     * @param hands 
     */
    dealAll(players: Player[], hands: object,) {
        if (players.length !== 0){
            //TODO
            // for (let player of players){
            //     hands[player.getPlayerID()] = this.deck.getCard();
            // }
        }
    }

    /**
     * 
     */
    dealPlayer(Player: any) {
        throw new Error("Method not implemented.");
    }

    clearAll(){

    }
}