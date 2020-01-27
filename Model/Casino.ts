import {Table} from "./Table";
import {Player} from "./Player";
import {Game} from "./Game";
import {Blackjack} from "./Blackjack";

let testTable = new Table(7, new Blackjack());

console.log(testTable);

let player1= new Player("Sepehr");

console.log(player1);

player1.joinTable(testTable);

console.log(testTable.players);

console.log(player1.tableID.tableID);