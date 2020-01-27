"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const Table_1 = require("../Model/Table");
const Player_1 = require("../Model/Player");
const Blackjack_1 = require("../Model/Blackjack");
const CustomErrors_1 = require("../Model/CustomErrors");
describe("Testing player and table funtionality", () => {
    it("Making a new player", () => {
        let player = new Player_1.Player("person1");
        expect(player.getPlayerID()).toEqual(player.playerID);
        expect(player.name).toBe("person1");
        expect(player.tableID).toEqual(null);
    });
    it("Testing a join/leaving table", () => {
        let player = new Player_1.Player("person1");
        let table = new Table_1.Table(7, new Blackjack_1.Blackjack());
        expect(table.players).toEqual([null, null, null, null, null, null, null]);
        expect(player.tableID).toEqual(null);
        player.joinTable(table);
        expect(table.players).toEqual([player, null, null, null, null, null, null]);
        player.leaveTable();
        expect(table.players).toEqual([null, null, null, null, null, null, null]);
        expect(player.tableID).toEqual(null);
        let player2 = new Player_1.Player("person2");
        expect(player2.tableID).toEqual(null);
        player2.joinTable(table);
        expect(table.players).toEqual([player2, null, null, null, null, null, null]);
        expect(player2.tableID).toEqual(table);
        expect(player.tableID).toEqual(null);
        player.joinTable(table);
        expect(player.tableID).toEqual(table);
        expect(table.players).toEqual([player2, player, null, null, null, null, null]);
        player2.leaveTable();
        expect(table.players).toEqual([null, player, null, null, null, null, null]);
        expect(player.tableID).toEqual(table);
        expect(player2.tableID).toEqual(null);
        let player3 = new Player_1.Player("person3");
        let player4 = new Player_1.Player("person4");
        let player5 = new Player_1.Player("person5");
        let player6 = new Player_1.Player("person6");
        let player7 = new Player_1.Player("person7");
        player5.joinTable(table);
        player2.joinTable(table);
        player4.joinTable(table);
        player3.joinTable(table);
        player6.joinTable(table);
        player7.joinTable(table);
        expect(table.players).toEqual([player5, player, player2, player4, player3, player6, player7]);
        expect(player.tableID).toEqual(table);
        expect(player2.tableID).toEqual(table);
        expect(player3.tableID).toEqual(table);
        expect(player4.tableID).toEqual(table);
        expect(player5.tableID).toEqual(table);
        expect(player6.tableID).toEqual(table);
        expect(player7.tableID).toEqual(table);
        player.leaveTable();
        expect(table.players).toEqual([player5, null, player2, player4, player3, player6, player7]);
    });
    it("Testing map-based betting system ", () => {
        let player = new Player_1.Player("person1");
        let table = new Table_1.Table(7, new Blackjack_1.Blackjack());
        player.joinTable(table);
        expect(player.chipsCount).toEqual(0);
        expect(() => { player.betChips(200); }).toThrow(new CustomErrors_1.InsufficentChipsError("Not enough chips"));
        player.chipsCount = 200;
        expect(() => { player.betChips(200); }).not.toThrow();
        expect(table.bets.has(player.getPlayerID().toString())).toEqual(true);
        console.log(table.bets);
        expect(table.bets.get(player.getPlayerID().toString())).toEqual(200);
    });
    // it("", ()=>{
    // });
    // it("", ()=>{
    // });
    // it("", ()=>{
    // });
});
//# sourceMappingURL=PlayerSpec.js.map