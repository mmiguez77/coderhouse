import express from 'express';
//import {productos} from '../controllers/Producto.js';
const indexRoutes = express.Router();


// renderizar la vista del formulario de productos
indexRoutes.get('/', (req, res) => { res.render('pages/index', { prods: productos }) });


export default indexRoutes;

