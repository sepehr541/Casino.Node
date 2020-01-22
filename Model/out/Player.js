"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    // functions:
    constructor(name) {
        this.name = name;
        this.chipsCount = 0;
        this.playerID = Math.random() * 10;
        this.tableID = 0;
    }
    // join table
    joinTable(tableID) {
        if (tableID) {
            this.leaveTable(tableID);
        }
        this.tableID = tableID;
    }
    // leave table
    leaveTable(tableID) {
        // let table know your leaving
        this.tableID = 0;
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map