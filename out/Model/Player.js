"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IdGenerator_1 = require("./IdGenerator");
require("./CustomErrors");
const CustomErrors_1 = require("./CustomErrors");
class Player {
    // functions:
    constructor(name) {
        this.name = name;
        this.chipsCount = 0;
        this.playerID = IdGenerator_1.IdGenerator.generateID();
        this.tableID = null;
    }
    // join table
    joinTable(table) {
        if (this.tableID !== null) {
            this.leaveTable();
        }
        this.tableID = table;
        table.acceptPlayer(this);
    }
    // leave table
    leaveTable() {
        // let table know your leaving
        this.tableID.discardPlayer(this);
        this.tableID = null;
    }
    /**
     * Player bets at the table
     * @param amount amount of bet
     */
    betChips(amount) {
        //Throw error if amount is bigger than chips in account
        if (this.chipsCount < amount) {
            throw new CustomErrors_1.InsufficentChipsError("Not enough chips");
        }
        // Catch errors thrown by the table
        try {
            if (this.tableID.placeBet(amount, this)) {
                this.chipsCount -= amount;
            }
        }
        // TODO add more specific errors
        catch (error) {
            console.log("Bet could not be placed at this time");
        }
    }
    /**
     * getter for playerID
     *
     * @returns {number}
     */
    getPlayerID() {
        return this.playerID;
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map