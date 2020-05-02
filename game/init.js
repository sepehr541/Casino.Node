var Table = require('./Table');
var Blackjack = require('./Blackjack');

const init = (socket) => {
    let tables = [];
    let privates = [];
    tables.push(new Table(new Blackjack(), 1, socket.to(`table${1}`)));
    return {
        tables,
        privates
    }
}

module.exports = init;