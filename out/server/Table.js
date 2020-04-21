"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IdGenerator_1 = require("./IdGenerator");
require("./CustomErrors");
const CustomErrors_1 = require("./CustomErrors");
class Table {
    // functions:
    constructor(size, type) {
        this.tableID = IdGenerator_1.IdGenerator.generateID();
        this.size = size;
        this.gameOfTable = type;
        this.players = [];
        for (let i = 0; i < size; i++) {
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
    dealAll() {
        this.currPlayer = this.gameOfTable.dealAll(this.dealerHand, this.players, this.bets, this.playersHands);
    }
    dealPlayer() {
        this.gameOfTable.dealPlayer(this.players[this.currPlayer].getPlayerID(), this.playersHands);
        this.currPlayer = this.gameOfTable.getNextPlayer(this.players, this.currPlayer);
    }
    /**
     * Skips the player
     */
    skipPlayer() {
        this.currPlayer = this.gameOfTable.skipPlayer(this.currPlayer, this.players);
    }
    /**
     * Accepts a player
     * @param player
     */
    acceptPlayer(player) {
        let seatIndex = this.players.indexOf(null);
        if (player === null || seatIndex === -1) {
            return false;
        }
        else {
            // first null will be replaced with the player
            this.players[seatIndex] = player;
            player.setSeat(seatIndex);
            //player ahs and empty hand
            this.playersHands.set(player.getPlayerID(), []);
            //player has an initial bet of 0
            this.bets.set(player.getPlayerID().toString(), 0);
            return true;
        }
    }
    /**
     * removes a player from the table
     * @param player
     */
    discardPlayer(player) {
        let seatIndex = player.getSeat();
        if (seatIndex !== -1) {
            this.players[seatIndex] = null;
            if (this.currPlayer === seatIndex) {
                this.currPlayer = this.gameOfTable.getNextPlayer(this.players, this.currPlayer);
            }
        }
        else {
            throw new CustomErrors_1.NotAtTable("You are not at a table.");
        }
    }
    /**
     *
     * @param amount place the bet at the table
     * @param player
     */
    placeBet(amount, player) {
        this.bets.set(player.getPlayerID(), amount);
    }
}
exports.Table = Table;
//# sourceMappingURL=Table.js.map