import express from 'express';
import ProductoMongo from '../controllers/Producto_db_Mongo.js';
const productosRoutes = express.Router();

const producto = new ProductoMongo();

productosRoutes.get('/', producto.viewAll)
productosRoutes.get('/:id', producto.viewByID)
productosRoutes.get('/title/:title', producto.viewByName)
productosRoutes.get('/code/:code', producto.viewByCode)
productosRoutes.get('/price/:condition', producto.orderByPrice)
productosRoutes.get('/stock/:stock', producto.orderByStock)
productosRoutes.post('/', producto.add)
productosRoutes.delete('/:id', producto.drop)
productosRoutes.put('/:id', producto.update)

export default productosRoutes;


