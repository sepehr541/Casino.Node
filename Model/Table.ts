import {Game} from "./Game";
import {Player} from "./Player";
export class Table {
    // properties:
    // max number of players
    size: number;
    // Game type
    gameOfTable: Game;

    // Players
    players : Player[];

    // functions:
    constructor(size, type){
        this.size = size;
        this.gameOfTable = type;
    }

    dealAll(){

    }

    dealPlayer(){}

    nextPlayer(){}

    discardPlayer(){

    }


}