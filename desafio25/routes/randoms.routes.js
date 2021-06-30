import express from 'express';
import Random from '../controllers/Randoms.js'
const randomsRouter = express.Router();
const random = new Random();

//randomsRouter.post('/:number', random.postRandom)
randomsRouter.get('/', random.get)
randomsRouter.get('/:number', random.getRandom)


export default randomsRouter;