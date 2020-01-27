"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IdGenerator_1 = require("./IdGenerator");
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
    }
    /**
     * Deals all the players at the table
     * Calls the dealAll of game for game-specific dealing
     */
    dealAll() {
        this.gameOfTable.dealAll(this.players, this.playersHands);
    }
    dealPlayer() { }
    /**
     * Accepts a player
     * @param player
     */
    acceptPlayer(player) {
        if (player === null || this.players.indexOf(null) === -1) {
            return false;
        }
        else {
            this.players.forEach((p) => {
                if (p === player) {
                    return false;
                }
            });
            this.players[this.players.indexOf(null)] = player;
            this.playersHands.set(player.getPlayerID().toString(), "");
            this.bets.set(player.getPlayerID().toString(), 0);
            return true;
        }
    }
    /**
     * removes a player from the table
     * @param player
     */
    discardPlayer(player) {
        let pindex = -1;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i] === player) {
                pindex = i;
            }
        }
        if (pindex !== -1) {
            this.players[pindex] = null;
            return true;
        }
        return false;
    }
    //TODO
    placeBet(amount, player) {
        if (this.currPlayer === this.players.indexOf(player)) { // Checks for player's turn
            this.bets.set(player.getPlayerID().toString(), amount);
            return true;
            console.log("successful betting");
        }
        return false;
    }
}
exports.Table = Table;
//# sourceMappingURL=Table.js.map