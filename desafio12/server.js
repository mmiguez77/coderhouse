/* -- DEPENDENCIAS -- */
import express from 'express';
import {Server as HttpServer} from 'http';
import {Server as IOServer} from 'socket.io';
import router from './routes/productosRouter.js';
import path from 'path';
const __dirname = path.resolve();

import {productosArray} from './controllers/Producto.js';
const array = productosArray;

// COMIENZO APP
/* -- PUERTO DEL SERVER -- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/api/productos', router);
app.use(express.static('public'));

/* -- IO SERVER -- */
io.on('connection', socket => {
    console.log('Nuevo Cliente Conectado')
    socket.emit('productos', array)

})

/* -- VISTAS · EJS -- */
// app.set('view engine', 'ejs');
// app.get('/', (req, res) => {res.render('./public/', {array: array,})}); 

/* ---- SERVIDOR ---- */
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor HTTP en puerto: ${server.address().port}`)
    console.log('Para cancelar el server presionar CTRL + C')
}) 
server.on("error", error => console.log(`Error en servidor ${error}`))



