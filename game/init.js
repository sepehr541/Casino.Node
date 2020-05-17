var Table = require('./Table');
var Blackjack = require('./Blackjack');

const init = (io) => {
    let tables = {};
    let privates = {};
    tables['1'] = (new Table(new Blackjack(), '1', io.in(`table${1}`)));
    idArray = ['1'];
    return {
        tables,
        privates,
        idArray
    }
}

module.exports = init;