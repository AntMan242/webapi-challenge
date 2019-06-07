const express = require('express');
const server = express();

const projectRouter = require('./ProjectRouter');
const actionRouter = require('./ActionRouter');

server.use(express.json());

server.use('./api/projects', projectRouter);
server.use('./api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send('Server is hot!')
})

module.exports = server;