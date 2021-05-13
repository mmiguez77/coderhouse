// LINK POSTMAN: https://www.getpostman.com/collections/63df217239eed29c7379
/* -- DEPENDENCIAS -- */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

import { sqlite3, mysql } from './db/config.js'
import Mensaje from './controllers/Mensaje.js';
const mensajeSqlite3 = new Mensaje(sqlite3);
const mensajeMysql = new Mensaje(mysql);

import router from './routes/productos.routes.js';

import productoController from './controllers/Producto.js';
const productos = new productoController();


// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

/* -- ARCHIVOS ESTATICOS -- */
app.use(express.static('public'));

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/api/productos', router);


/* -------------------- Web Sockets ---------------------- */
const mensajes = []

io.on('connection', socket => {
    console.log(`Cliente ID:${socket.id} inició conexión`)
//productos
    socket.emit('all-productos', productos.findAll()) // envio de productos a una nueva conexión 1:1
    io.sockets.emit('all-productos', productos.findAll()) // envio de productos a todos los sockets
//mensajes
    socket.emit('message', mensajes) // envio de mensaje a una nueva conexión 1:1

    socket.on('new-message', (data) => {        // recibo el mensaje desde el cliente con "new-message"
        console.log('MENSAJE RECIBIDO', data)
        mensajes.push(data)                     // los agrego al array
        io.sockets.emit('message', mensajes)    // envio el mensaje recibido a todos los sockets
    });

    socket.on('update', () => {                                     // recibo la actualizacion del producto
        io.sockets.emit('updateProductos', productos.findAll())     // envio a todos los sockets el nvo producto
    })
});


/* ---- SERVIDOR ---- */
const server = httpServer.listen(PORT, () => {
    console.log(`** Servidor HTTP en puerto: ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));



