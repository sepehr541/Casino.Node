const express = require("express");
const http = require("http");
var morgan = require('morgan');


const app = express();
server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.use(morgan('combined'));


/* Starting server */
server.listen(3000, () => {
    console.log('listening on *:3000');
});



