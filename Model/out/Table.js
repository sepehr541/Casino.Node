"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Table {
    // functions:
    constructor(size, type) {
        this.size = size;
        this.gameOfTable = type;
        this.playersHands = {};
        this.bets = {};
    }
    dealAll() {
        this.gameOfTable.dealAll(this.players, this.playersHands);
    }
    dealPlayer() { }
    acceptPlayer() {
        return false;
    }
    discardPlayer() {
        return false;
    }
}
exports.Table = Table;
//# sourceMappingURL=Table.js.map