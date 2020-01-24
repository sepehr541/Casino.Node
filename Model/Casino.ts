import {Table} from "./Table";
import {Player} from "./Player";
import {Game} from "./Game";
import {Blackjack} from "./Blackjack";

let testTable = new Table(7, new Blackjack());

let player1= new Player("Sepehr");

player1.joinTable(testTable);
