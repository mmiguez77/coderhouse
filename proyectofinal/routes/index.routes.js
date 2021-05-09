import express from 'express';
import { productos } from '../controllers/Producto.js'
const indexRoutes = express.Router();


indexRoutes.get('/', (req, res) => { res.render('pages/index', { prods: productos }) });






export default indexRoutes;