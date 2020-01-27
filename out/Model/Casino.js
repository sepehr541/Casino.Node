"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Table_1 = require("./Table");
const Player_1 = require("./Player");
const Blackjack_1 = require("./Blackjack");
let testTable = new Table_1.Table(7, new Blackjack_1.Blackjack());
console.log(testTable);
let player1 = new Player_1.Player("Sepehr");
console.log(player1);
player1.joinTable(testTable);
console.log(testTable.players);
console.log(player1.tableID.tableID);
//# sourceMappingURL=Casino.js.map