import express from 'express';
import ProductoMongo from '../controllers/Producto_db_Mongo.js';
import { validate } from '../passport/auth.js';
const productosRoutes = express.Router();

const producto = new ProductoMongo();

productosRoutes.get('/', validate, producto.viewAll);
productosRoutes.get('/:id', validate, producto.viewByID);
productosRoutes.get('/title/:title', validate, producto.viewByName);
productosRoutes.get('/code/:code', validate, producto.viewByCode);
productosRoutes.get('/price/:condition', validate, producto.orderByPrice);
productosRoutes.get('/stock/:stock', validate, producto.orderByStock);
productosRoutes.post('/', validate, producto.add);
productosRoutes.delete('/:id', validate, producto.drop);
productosRoutes.put('/:id', validate, producto.update);

export default productosRoutes;


