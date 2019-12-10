const { Router } = require('express');
const Log = require('../models/Log');

module.exports = Router()
  .post('/', (req, res) => {
    Log
      .create(req.body)
      .then(log => res.send(log));
  })

  .get('/', (req, res) => {
    Log
      .find()
      .select({ name: true })
      .then(logs => res.send(logs));
  })

  .get('/:id', (req, res) => {
    Log
      .findById(req.params.id)
      .then(log => res.send(log));
  })

  .patch('/:id', (req, res) => {
    Log
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(log => res.send(log));
  })

  .delete('/:id', (req, res) => {
    Log
      .findByIdAndDelete(req.params.id)
      .then(log => res.send(log));
  });
