import "jasmine";
import {Table} from "../server/Table";
import {Player} from "../server/Player";
import {Blackjack} from "../server/Blackjack";
import { InsufficentChipsError } from "../server/CustomErrors";
/**
 * IF PRINTING A PLAYER OR TABLE, Remember that it would be CIRCULAR
 * Table and player have a bidirectional relationship
 */

describe("Testing player and table funtionality", () => {
    let table : Table;
    let player : Player;
    let player2 : Player;
    let player3 : Player;
    let player4 : Player;
    let player5 : Player;
    let player6 : Player;
    let player7 : Player;

    beforeEach(()=>{
        table = new Table(7, new Blackjack());
        player = new Player("person1");
        player2 = new Player("person2");
        player3 = new Player("person3");
        player4 = new Player("person4");
        player5 = new Player("person5");
        player6 = new Player("person6");
        player7 = new Player("person7");
        player.chipsCount = 200;
        player2.chipsCount = 500;
        player3.chipsCount = 300;
        player4.chipsCount = 350;
        player5.chipsCount = 320;
        player6.chipsCount = 310;
        player7.chipsCount = 100;
        
    })

    it("Making a new player", () => {
        expect(player.getPlayerID()).toEqual(player.playerID.toString());
        expect(player.name).toBe("person1");
        expect(player.tableID).toEqual(null);
    });

    it("Testing a join/leaving table", ()=>{
        expect(table.players).toEqual([null, null, null, null, null, null, null]);
        expect(player.tableID).toEqual(null);
        player.joinTable(table);
        expect(table.players).toEqual([player, null, null, null, null, null, null]);
        player.leaveTable();
        expect(table.players).toEqual([null, null, null, null, null, null, null])
        expect(player.tableID).toEqual(null);
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
        expect(table.players).toEqual([player5, null, player2, player4, player3, player6, player7])
    });

    it("Testing map-based betting system ", ()=>{

        player.joinTable(table);
        player.chipsCount = 0
        expect(() => {player.betChips(200)}).toThrow(new InsufficentChipsError("Not enough chips"));
        player.chipsCount = 200;
        expect(()=>{player.betChips(200)}).not.toThrow()
        expect(table.bets.has(player.getPlayerID().toString())).toEqual(true);
        expect(table.bets.get(player.getPlayerID().toString())).toEqual(200);
        player5.joinTable(table);
        player2.joinTable(table);
        player4.joinTable(table);
        player3.joinTable(table);
        player6.joinTable(table);
        player7.joinTable(table);
        
        expect(()=>{player5.betChips(40)}).not.toThrow();
        
        expect(table.bets.has(player5.getPlayerID())).toBe(true);
        expect(table.bets.get(player5.getPlayerID())).toBe(40);
        expect(player5.chipsCount).toBe(320 -40);
        
        expect(()=>{player2.betChips(170)}).not.toThrow();
        expect(table.bets.has(player2.getPlayerID())).toBe(true);
        expect(table.bets.get(player2.getPlayerID())).toBe(170);
        expect(player2.chipsCount).toBe(500 -170);

        expect(()=>{player3.betChips(190)}).not.toThrow();
        expect(table.bets.has(player3.getPlayerID())).toBe(true);
        expect(table.bets.get(player3.getPlayerID())).toBe(190);
        expect(player3.chipsCount).toBe(300 -190);


        expect(()=>{player4.betChips(190)}).not.toThrow();
        expect(table.bets.has(player4.getPlayerID())).toBe(true);
        expect(table.bets.get(player4.getPlayerID())).toBe(190);
        expect(player4.chipsCount).toBe(350 -190);


        
    });

    it("Dealing all players", ()=>{
        player.joinTable(table);
        player5.joinTable(table);
        player2.joinTable(table);
        player4.joinTable(table);
        player3.joinTable(table);
        player6.joinTable(table);
        player7.joinTable(table);

        player.betChips(100);
        player2.betChips(100);
        player3.betChips(100);
        player4.betChips(100);
        player5.betChips(100);
        player6.betChips(100);
        player7.betChips(100);

        expect(table.playersHands.get(player.getPlayerID())).toEqual([]);
        expect(table.playersHands.get(player2.getPlayerID())).toEqual([]);
        expect(table.playersHands.get(player3.getPlayerID())).toEqual([]);
        expect(table.playersHands.get(player4.getPlayerID())).toEqual([]);
        expect(table.playersHands.get(player5.getPlayerID())).toEqual([]);
        expect(table.playersHands.get(player6.getPlayerID())).toEqual([]);
        expect(table.playersHands.get(player7.getPlayerID())).toEqual([]);

        expect(table.playersHands.get(player.getPlayerID()).length).toEqual(0);
        expect(table.playersHands.get(player2.getPlayerID()).length).toEqual(0);
        expect(table.playersHands.get(player3.getPlayerID()).length).toEqual(0);
        expect(table.playersHands.get(player4.getPlayerID()).length).toEqual(0);
        expect(table.playersHands.get(player5.getPlayerID()).length).toEqual(0);
        expect(table.playersHands.get(player6.getPlayerID()).length).toEqual(0);
        expect(table.playersHands.get(player7.getPlayerID()).length).toEqual(0);
        
        table.dealAll();

        expect(table.playersHands.get(player.getPlayerID())).not.toEqual([]);
        expect(table.playersHands.get(player2.getPlayerID())).not.toEqual([]);
        expect(table.playersHands.get(player3.getPlayerID())).not.toEqual([]);
        expect(table.playersHands.get(player4.getPlayerID())).not.toEqual([]);
        expect(table.playersHands.get(player5.getPlayerID())).not.toEqual([]);
        expect(table.playersHands.get(player6.getPlayerID())).not.toEqual([]);
        expect(table.playersHands.get(player7.getPlayerID())).not.toEqual([]);

        expect(table.playersHands.get(player.getPlayerID()).length).toEqual(2);
        expect(table.playersHands.get(player2.getPlayerID()).length).toEqual(2);
        expect(table.playersHands.get(player3.getPlayerID()).length).toEqual(2);
        expect(table.playersHands.get(player4.getPlayerID()).length).toEqual(2);
        expect(table.playersHands.get(player5.getPlayerID()).length).toEqual(2);
        expect(table.playersHands.get(player6.getPlayerID()).length).toEqual(2);
        expect(table.playersHands.get(player7.getPlayerID()).length).toEqual(2);

        expect(table.dealerHand).not.toEqual([]);
        expect(table.dealerHand.length).toEqual(2);
        

    });

    it("Dealing individual players in turn", () => {
        player.joinTable(table);
        player5.joinTable(table);
        player2.joinTable(table);
        player4.joinTable(table);
        player3.joinTable(table);
        player6.joinTable(table);
        player7.joinTable(table);

        player.betChips(100);
        player2.betChips(100);
        player3.betChips(100);
        player4.betChips(100);
        player5.betChips(100);
        player6.betChips(100);
        player7.betChips(100);

        table.dealAll();
        expect(table.currPlayer).toBe(0);
        table.dealPlayer();

        expect(table.currPlayer).toBe(1);

        player5.leaveTable();
        expect(table.currPlayer).toBe(2);

        table.dealPlayer();
        table.dealPlayer();
        expect(table.currPlayer).toBe(4);

    });
    
    it("Summing Up hands", ()=>{
        
    });
});
