/* -- DEPENDENCIAS -- */
import express from 'express';
import productosRoutes from './routes/producto.routes.js';
import indexRoutes from './routes/index.routes.js';

import path from 'path';
const __dirname = path.resolve();

// COMIENZO APP
/* -- PUERTO DEL SERVER -- */
const app = express();
const PORT = 8080;

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/productos', productosRoutes);
app.use('/', indexRoutes)

/* -- EJS -- */
app.set('view engine', 'ejs');
app.set('views', './views')

/* ---- SERVIDOR ---- */
const server = app.listen(PORT, () => {
    console.log(`Servidor http en puerto: ${server.address().port}`)

})
server.on("error", error => console.log(`Error en servidor ${error}`))
