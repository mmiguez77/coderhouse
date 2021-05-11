import express from 'express';
import { viewAll, add, viewByID, drop, update } from '../controllers/Producto.js';
const productosRoutes = express.Router();

productosRoutes.get('/', viewAll)
productosRoutes.get('/:id', viewByID)
productosRoutes.post('/', add)
productosRoutes.delete('/:id', drop)
productosRoutes.put('/:id', update)


export default productosRoutes;