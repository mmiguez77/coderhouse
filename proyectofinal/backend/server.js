import express from 'express';
import path from 'path';
const __dirname = path.resolve();

import routerProduct from './routes/producto.routes.js';
// import Producto from './controllers/Producto.js';
// const producto = new Producto();

// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
const app = express();
const PORT = 8080;

/* -- ARCHIVOS ESTATICOS -- */
app.use(express.static('../frontend/public'));

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/productos', routerProduct);
//app.use('/carrito',  router  );


/* ---- SERVIDOR ---- */
const server = app.listen(PORT, () => {
    console.log(`** Servidor en puerto: ${PORT}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));