import {Game} from "./Game";
import {IdGenerator} from "./IdGenerator";
import { Player } from "./Player";
import "./CustomErrors"
import { WrongTurnBettingError, NotAtTable } from "./CustomErrors";
export class Table {
    // properties:
    
    // Table's id
    tableID : number;

    // max number of players
    size: number;

    // Game type
    gameOfTable: Game;

    //Table's hand, use if there is any
    dealerHand: string[];

    // Players
    players : Player[];

    // index of curr player for turn tracking
    // NEED TO FIX THE TURN TRACKING
    currPlayer: number;

    // hands corresponding to each player
    playersHands: Map<string, string[]>;

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
        this.dealerHand = [];
    }


    /**
     * Deals all the players at the table
     * Calls the dealAll of game for game-specific dealing
     */
    dealAll(){
        this.currPlayer = this.gameOfTable.dealAll(this.dealerHand,
            this.players, 
            this.bets, 
            this.playersHands);
    }

    dealPlayer(){
        this.gameOfTable.dealPlayer(this.players[this.currPlayer].getPlayerID(), this.playersHands);
        this.currPlayer = this.gameOfTable.getNextPlayer(this.players, this.currPlayer);
    }

    /**
     * Skips the player
     */
    skipPlayer(){
        this.currPlayer = this.gameOfTable.skipPlayer(this.currPlayer, this.players);
    }

    /**
     * Accepts a player
     * @param player 
     */
    acceptPlayer(player: Player): boolean {
        let seatIndex = this.players.indexOf(null);
        if (player === null || seatIndex === -1){
            return false;
        } else {
            // first null will be replaced with the player
            this.players[seatIndex] = player;
            player.setSeat(seatIndex);
            //player ahs and empty hand
            this.playersHands.set(player.getPlayerID(), []);
            //player has an initial bet of 0
            this.bets.set(player.getPlayerID().toString(),0);
            return true;
        }  

    }

    /**
     * removes a player from the table
     * @param player 
     */
    discardPlayer(player: Player) {
        let seatIndex = player.getSeat();
        if(seatIndex !== -1){
            this.players[seatIndex] = null;
            if(this.currPlayer === seatIndex){
                this.currPlayer = this.gameOfTable.getNextPlayer(this.players, this.currPlayer);
            }
        } else{
            throw new NotAtTable("You are not at a table.");
        }
    }

    /**
     * 
     * @param amount place the bet at the table
     * @param player 
     */
    placeBet(amount: number, player: Player) {
        this.bets.set(player.getPlayerID(), amount);
    }
}