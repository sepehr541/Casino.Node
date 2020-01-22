import {Game} from "./Game";
export class Blackjack implements Game {
    
    // properties:
    size: number;    decksRequired: number;

    // functions:
    constructor(){
        this.size = 7;
        this.decksRequired = 6;
    }

    dealAllsitting(){

    }
}