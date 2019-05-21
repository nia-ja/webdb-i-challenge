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
          error: error
        });
      }
});

server.get('/api/accounts/:id', async (req, res) => {
    try {
        const account = await Accounts.findById(req.params.id);
        if(account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: "The account with the specified ID does not exist." })
        }
    } catch (error) {
        res.status(500).json({ 
            message: "The account information could not be retrieved.",
            error: error 
        })
    }
})

server.post('/api/accounts', async (req, res) => {
    try {
        const account = await Accounts.add(req.body);
        res.status(201).json(account);
      } catch (error) {
        res.status(500).json({
          message: 'Error adding the account',
          error: error
        });
      }
});

server.delete('/api/accounts/:id', async (req, res) => {
    try {
        const count = await Accounts.remove(req.params.id);
        if (count > 0) {
          res.status(200).json({ message: 'The account has been deleted' });
        } else {
          res.status(404).json({ message: 'The account could not be found' });
        }
      } catch (error) {
        res.status(500).json({
          message: 'Error removing the account',
          error: error
        });
      }
});

server.put('/api/accounts/:id', async (req, res) => {
    try {
        const account = await Accounts.update(req.params.id, req.body);
        if (account === 1) {
          res.status(200).json({ id: req.params.id, ...req.body });
        } else {
          res.status(404).json({ message: 'The account could not be found' });
        }
      } catch (error) {
        res.status(500).json({
          message: 'Error updating the account',
          error: error
        });
      }
});


module.exports = server;