import express from 'express';
import Producto from '../controllers/ProductoMongo.js';
const producto = new Producto()
const productosRoutes = express.Router();


productosRoutes.get('/', producto.viewAll)
productosRoutes.get('/:id', producto.viewByID)
productosRoutes.post('/', producto.add)
productosRoutes.delete('/:id', producto.drop)
productosRoutes.put('/:id', producto.update)


export default productosRoutes;