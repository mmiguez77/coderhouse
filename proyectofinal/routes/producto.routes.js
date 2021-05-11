import express from 'express';
import {viewAll, add, viewByID} from '../controllers/Producto.js';
const productosRoutes = express.Router();


// renderizar vista
//productosRoutes.get('/', (req, res) => { res.render('pages/productos')})

// metodo para ver todos los productos y por ID
productosRoutes.get('/', viewAll)
productosRoutes.get('/:id', viewByID)

// metodo para agregar producto
productosRoutes.post('/', add)

// metodo para eliminar producto
//productosRoutes.delete('/:id', producto.delete)

// metodo para actulizar producto
//productosRoutes.put('/:id', producto.update)


export default productosRoutes;