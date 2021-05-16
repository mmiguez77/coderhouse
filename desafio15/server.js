// LINK POSTMAN: https://www.getpostman.com/collections/63df217239eed29c7379
/* -- DEPENDENCIAS -- */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { sqlite3, mysql } from './db/config.js'
import router from './routes/productos.routes.js';

import MensajeDB from './controllers/Mensaje.js';

import { createTableProd, findAll } from './controllers/Producto.js';
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
// mensajeSqlite3.createTable()

// //const mensajes = []
io.on('connection', socket => {
    //     try {
    //         console.log(`Cliente ID:${socket.id} inició conexión`)
    //         const mensajes = await mensajeSqlite3.readMessage();
    //         console.log('LOG DE MENSAJES EN CONEXION', mensajes)
    //         socket.emit('message', mensajes)
    //         mensajeSqlite3.close()
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     socket.on('new-message', async (data) => {
    //         try {
    //             console.log(data)
    //             await mensajeSqlite3.newMessage(data);
    //             const newMensaje = await mensajeSqlite3.readMessage();
    //             io.sockets.emit('message', newMensaje)
    //         } catch (error) {
    //             console.log(error);
    //         }

    //     });


    socket.emit('all-productos', productoInDB)

    socket.on('nuevo-producto', async () => {
        const products = await findAll();
        io.sockets.emit('all-productos', products);
      });


    socket.on('update', () => {
        io.sockets.emit('updateProductos', productoInDB)
    })
});

/* io.off('disconnect', async () => {
    mensajeSqlite3.close()
}) */



/* ---- SERVIDOR ---- */
const server = httpServer.listen(PORT, () => {
    console.log(`** Servidor HTTP en puerto: ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));



