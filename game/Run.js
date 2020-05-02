'use strict'
// Testing blackjack logic
var Table = require('./Table');
var Blackjack = require('./Blackjack');
var Player = require('./Player');

console.log('Welcome to Casino Node');
console.log('Initializing');
var blackjack = new Blackjack();
var table = new Table(blackjack, 1);
var players = [];
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})


const menuCommmands = (command) => {
    switch (command) {
        case ("exit"):
            readline.close();
            break;
    }
}


const askName = () => {
    return new Promise((reject, resolve) => {
        readline.question(`Enter name: `, (name) => {
            console.log('Creating player');
            let player = new Player(name);
            players.push(player);
            console.log('Joining Table');
            player.joinTable(table);
            console.log(`joined BlackJack table ${table.getTableId()}`);
            resolve();
        })
    })
}

const bet = () => {
    return new Promise((reject, resolve) => {
        readline.question(`Enter your bet: `, (bet) => {
            try {
                console.log('Making bet');
                players[0].betChips(parseInt(bet));
                console.log('Bet successful');
                console.log('Dealing hands');
                table.dealAll();
                table.drawTable();
            } catch (e) {
                console.log('cannot make bet');
                console.log(e);
            }
            resolve();
        })
    })
}

const action = () => {
    return new Promise((reject, resolve) => {
        readline.question(`Enter Number(1 - Hit, 2 - Stay) : `, (action) => {
            switch (parseInt(action)) {
                case (1):
                    table.dealPlayer();
                    break;
                case (2):
                    table.skipPlayer();
                    break;
                default:
                    console.log('Invalid Number');
                    this.dealPlayer();
                    break;
            }
            table.drawTable();
            console.log(table.getStatus());
            resolve();
        })
    })
}

const main = async () => {
    await askName().catch((e) => console.log(e));
    await askName().catch((e) => console.log(e));
    console.log(players);
    await bet().catch(e => console.log(e));
    await action().catch(e => console.log(e));
    readline.close();
}

main();




