// LINK POSTMAN: https://www.getpostman.com/collections/63df217239eed29c7379

/* -- DEPENDENCIAS -- */
import express from 'express';
import router from './routes/productosRouter.js';
import path from 'path';
import {productosArray} from './controllers/Producto.js'
const __dirname = path.resolve();
const array = productosArray

// COMIENZO APP
/* -- PUERTO DEL SERVER -- */
const app = express();
const PORT = 8080;

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/api/productos', router);

/* -- EJS -- */
app.set('view engine', 'ejs');
app.set('views', './views')
app.get('/home', (req, res) => {res.render('pages/index', {array: array,})}); 

/* ---- SERVIDOR ---- */
const server = app.listen(PORT, () => {
    console.log(`Servidor http en puerto: ${server.address().port}`)
    console.log('Para cancelar el server presionar CTRL + C')
}) 
server.on("error", error => console.log(`Error en servidor ${error}`))



