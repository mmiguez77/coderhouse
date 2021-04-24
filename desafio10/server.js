// LINK POSTMAN: https://www.getpostman.com/collections/63df217239eed29c7379
/* -- DEPENDENCIAS -- */
import express from 'express';
import router from './routes/productosRouter.js';
import handlebars  from 'express-handlebars';
import path from 'path';
const __dirname = path.resolve();

//import ProductoController from './controllers/Producto.js';
import {productosArray} from './controllers/Producto.js'
//const producto = new ProductoController();
const array = productosArray
const trueFalse = () => { if (productosArray.length >= 1){return true} else { return false } }
//console.log(array)
//console.log(trueFalse())

// COMIENZO APP
/* -- PUERTO DEL SERVER -- */
const app = express();
const PORT = 8080;

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/api/productos', router);

/* -- STATIC FILES -- */

/* -- HANDLEBARS -- */
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
        extname: 'hbs',
        defaultLayout: 'index',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
);
app.set('views', './views')
app.get('/home', (req, res) => {
    res.render('main' ,  { 
        validacion: trueFalse,
        array: array});
}); 

/* ---- SERVIDOR ---- */
const server = app.listen(PORT, () => {
    console.log(`Servidor http en puerto: ${server.address().port}`)
    console.log('Para cancelar el server presionar CTRL + C')
}) 
server.on("error", error => console.log(`Error en servidor ${error}`))



