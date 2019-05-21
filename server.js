const express = require('express');

const Accounts = require('./data/accounts-model.js');


const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2>My first database!</h2>`)
});

server.get('/api/accounts', async (req, res) => {
    try {
        const accounts = await Accounts.find();
        res.status(200).json(accounts);
      } catch (error) {
        res.status(500).json({
          message: 'Error retrieving the accounts',
        });
      }
});

module.exports = server;