import express from 'express';
import { /* productos ,*/viewAll, add, viewByID, drop, update } from '../controllers/Producto.js';
const productosRoutes = express.Router();


//productosRoutes.get('/', (req, res) => { res.render('pages/productos', {prods: productos})}) // renderizar vista 
productosRoutes.get('/', viewAll)
productosRoutes.get('/:id', viewByID)
productosRoutes.post('/', add)
productosRoutes.delete('/:id', drop)
productosRoutes.put('/:id', update)


export default productosRoutes;