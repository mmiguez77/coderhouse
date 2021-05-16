// LINK POSTMAN: https://www.getpostman.com/collections/63df217239eed29c7379
/* -- DEPENDENCIAS -- */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { sqlite3, mysql } from './db/config.js'
import router from './routes/productos.routes.js';

import MensajeDB from './controllers/Mensaje.js';

import { createTableProd, findAll, close } from './controllers/Producto.js';
createTableProd(mysql)
let productoInDB = await findAll()
console.log('ARRAY PRODUCTOS EN LOG DEL SERVER', productoInDB)



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
    socket.emit('message', mensajes)
    socket.emit('all-productos', productoInDB)
    

    socket.on('new-message', (data) => {
        mensajes.push(data)
        io.sockets.emit('message', mensajes)
    });

    io.sockets.emit('all-productos', productoInDB)

       socket.on('update', () => {
        io.sockets.emit('updateProductos', productoInDB)
    })
});

io.on('disconnect', async () => {
    await close()
})



/* ---- SERVIDOR ---- */
const server = httpServer.listen(PORT, () => {
    console.log(`** Servidor HTTP en puerto: ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));



