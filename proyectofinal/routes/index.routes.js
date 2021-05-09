import express from 'express';
import { productos } from '../controllers/Producto.js'
const indexRoutes = express.Router();
let prods = productos

indexRoutes.get('/', (req, res) => { res.render('pages/index', { prods: prods }) });






export default indexRoutes;