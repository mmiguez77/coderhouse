import express from 'express';
import {add, findAll, findByID, del, update} from '../controllers/Producto.js';
const router = express.Router();

router.post('/', add);
router.get('/', findAll);
router.get('/:id',findByID);
router.delete('/:id', del);
router.put('/:id', update);



export default router;