/* ********** NOTA ************ */
// https://www.getpostman.com/collections/63df217239eed29c7379
/*
* En los archivos: carrito.routes.js y producto.routes.js se encuenta
* la opción para el cambio de tipo de DB
*/

/* -- DEPENDENCIAS -- */
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import history from 'connect-history-api-fallback'
import path from 'path';
const __dirname = path.resolve();

import productosRoutes from './routes/producto.routes.js';
import cartRoutes from './routes/carrito.routes.js'

// COMIENZO APP
/* -- PUERTO DEL SERVER -- */
const app = express();
const PORT = process.env.PORT || 5000; // si el puerto está ocupado utiliza otro

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());


/* -- ENDPOINTS -- */
//app.use('/', indexRoutes);
app.use('/api/productos', productosRoutes);
app.use('/cart', cartRoutes);

/* -- STATIC & VUE HISTORY --*/
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

///// VARIABLE ADMINISTRADORA  
const administrador = false;

/* ---- SERVIDOR ---- */
const server = app.listen(PORT, () => {
    console.log(`Servidor http en puerto: ${server.address().port}`)

})
server.on("error", error => console.log(`Error en servidor ${error}`))
