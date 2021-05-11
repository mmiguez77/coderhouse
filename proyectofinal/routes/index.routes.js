import express from 'express';
const indexRoutes = express.Router();


// renderizar la vista del formulario de productos
indexRoutes.get('/', (req, res) => { res.render('pages/index') });


export default indexRoutes;

