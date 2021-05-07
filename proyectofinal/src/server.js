import express from 'express';
import path from 'path';
const __dirname = path.resolve();

import productosRoutes from './routes/producto.routes.js';
// import Producto from './controllers/Producto.js';
// const producto = new Producto();

/* ---- COMIENZO APP ---- */

// configuracion server
const app = express();
const PORT = 8080;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas - endpoints
app.use('/productos', productosRoutes);
//app.use('/carrito',  router  );

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// vistas
// app.set('view engine', 'ejs');
// app.get('views', path.join(__dirname, 'views'))


/* ---- SERVIDOR ---- */
const server = app.listen(PORT, () => {
    console.log(`** Servidor en puerto: ${PORT}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));