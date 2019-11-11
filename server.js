const express = require('express');
const helmet = require('helmet');
const server = express();

const ActionRouter = require('./data/helpers/actionRouter');
const ProjectRouter = require('./data/helpers/projectRouter');

server.use(helmet());
server.use(express.json());

server.use('/api/action', ActionRouter);
server.use('/api/project', ProjectRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>Jenn's Web API Sprint</h2>
    <p>Let's see if this works</p>
    `)
})

module.exports = server;