import express from 'express';
import { viewAllCart, addCart, viewByIDCart, dropCart } from '../controllers/Carrito.js';
const cartRoutes = express.Router();


cartRoutes.get('/', viewAllCart)
cartRoutes.get('/:id', viewByIDCart)
cartRoutes.post('/:id', addCart)
cartRoutes.delete('/:id', dropCart)



export default cartRoutes;