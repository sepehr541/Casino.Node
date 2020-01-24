import {Game} from "./Game";
import { Player } from "./Player";
import { Deck } from "./Deck";

export class Blackjack implements Game {

    // properties:
    size: number;    decksRequired: number;

    deck: Deck;

    // functions:
    constructor(){
        this.size = 7;
        this.decksRequired = 6;
        this.deck = new Deck(6);
    }

    dealAll(players: number[], hands: object,) {
        if (players.length !== 0){
            for (let player of players){
                hands[player] = this.deck.getCard();
            }
        }
    }
    dealPlayer(Player: any) {
        throw new Error("Method not implemented.");
    }

    clearAll(){

    }
}