const express = require('express');
const controller = require('./controller');

module.exports = express
  .Router()
  .get('/', controller.get)
  .post('/:id', controller.update)
  .post('/', controller.create);
