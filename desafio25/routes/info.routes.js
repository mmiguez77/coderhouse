const express = require ('express');
const Info = require ('../controllers/Info.js')
const infoRouter = express.Router();
const info = new Info();

infoRouter.get('/', info.getInfo )





module.exports = infoRouter;