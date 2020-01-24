import {Game} from "./Game";
export class Table {
    // properties:
    // max number of players
    size: number;
    // Game type
    gameOfTable: Game;

    // Players
    players : number[];

    // index of curr player for turn tracking
    currPlayer: number;

    // hands corresponding to each player
    playersHands: object;

    //bets
    bets: object;

    // functions:
    constructor(size, type: Game){
        this.size = size;
        this.gameOfTable = type;
        this.playersHands = {};
        this.bets = {};
    }

    dealAll(){
        this.gameOfTable.dealAll(this.players, this.playersHands);
    }

    dealPlayer(){}

    acceptPlayer(): boolean{
        return false;
    }

    discardPlayer(): boolean{
        return false
    }


}