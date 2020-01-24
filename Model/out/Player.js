"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    // functions:
    constructor(name) {
        this.name = name;
        this.chipsCount = 0;
        this.playerID = Math.random() * 10;
        this.tableID = null;
    }
    // join table
    joinTable(table) {
        if (table) {
            this.leaveTable(table);
        }
        this.tableID = table;
    }
    // leave table
    leaveTable(tableID) {
        // let table know your leaving
        this.tableID = null;
        tableID.discardPlayer(this.playerID);
    }
    betChips() {
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