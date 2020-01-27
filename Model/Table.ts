import {Game} from "./Game";
import {IdGenerator} from "./IdGenerator";
import { Player } from "./Player";
export class Table {
    // properties:
    
    // Table's id
    tableID : number;

    // max number of players
    size: number;

    // Game type
    gameOfTable: Game;

    // Players
    players : Player[];

    // index of curr player for turn tracking
    // NEED TO FIX THE TURN TRACKING
    currPlayer: number;

    // hands corresponding to each player
    playersHands: Map<string, string>;

    //bets
    bets: Map<string, number>;

    // functions:
    constructor(size, type: Game){
        this.tableID = IdGenerator.generateID();
        this.size = size;
        this.gameOfTable = type;
        this.players = [];
        for(let i = 0; i < size; i++) {
            this.players.push(null);
        }
        this.playersHands = new Map();
        this.bets = new Map();
        this.currPlayer = 0;
    }


    /**
     * Deals all the players at the table
     * Calls the dealAll of game for game-specific dealing
     */
    dealAll(){
        this.gameOfTable.dealAll(this.players, this.playersHands);
    }

    dealPlayer(){}

    /**
     * Accepts a player
     * @param player 
     */
    acceptPlayer(player: Player): boolean {
        if (player === null || this.players.indexOf(null) === -1){
            return false;
        } else {
            this.players.forEach((p) => {
                if (p === player){
                    return false;
                }
            });

            this.players[this.players.indexOf(null)] = player;
            this.playersHands.set(player.getPlayerID().toString(),"");
            this.bets.set(player.getPlayerID().toString(),0);
            return true;
        }    

    }

    /**
     * removes a player from the table
     * @param player 
     */
    discardPlayer(player: Player): boolean {
        let pindex = -1;
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i] === player){
                pindex = i;
            }
        }

        if(pindex !== -1){
            this.players[pindex] = null;
            return true;
        }

        return false;
    }

    //TODO
    placeBet(amount: number, player: Player): boolean { 
        if (this.currPlayer === this.players.indexOf(player)){ // Checks for player's turn
            this.bets.set(player.getPlayerID().toString(), amount);
            return true;
            console.log("successful betting");
        }
        return false;
    }

}