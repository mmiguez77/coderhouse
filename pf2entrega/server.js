/* -- DEPENDENCIAS -- */
import express from 'express';
import mongoose from 'mongoose';
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
const PORT = process.env.PORT || 5000;

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());

/* -- MOONGOSE -- */
const uri = 'mongodb://localhost:27017/proyecto'
const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
mongoose.connect(uri, options).then(
    () => { console.log('Conectado a Mongo') },
    err => { err }
);

/* -- ENDPOINTS -- */
//app.use('/', indexRoutes);
app.use('/api/productos', productosRoutes);
app.use('/cart', cartRoutes);

/* -- 404 -- */
//app.use((req, res) => {res.status(404).render('./pages/404')});

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
