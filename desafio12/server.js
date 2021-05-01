/* -- DEPENDENCIAS -- */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import path from 'path';
const __dirname = path.resolve();

import router from './routes/productos.routes.js';
import { productosArray } from './controllers/Producto.js';
const array = productosArray;
//console.log('** Console.log de Array en Server.js',array)


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
    //socket.emit('addProductos', array)

    socket.on('new-message', (data) => {
        //console.log('*** console.log de nuevoMensaje',data)
        mensajes.push(data)
        io.sockets.emit('message', mensajes)
    });

    socket.on('new-producto', (data) => {
        console.log('**** console.log de socket.on addProducto:', data)
        socket.broadcast.emit('all-productos', array)
    })  
});


/* ---- SERVIDOR ---- */
const server = httpServer.listen(PORT, () => {
    console.log(`** Servidor HTTP en puerto: ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));



