const express = require('express');
const Random  = require('../controllers/Randoms.js');
const randomsRouter = express.Router();
const random = new Random();

randomsRouter.get('/', random.getRandom);
//randomsRouter.get('/number', random.getNumber);



module.exports = randomsRouter;