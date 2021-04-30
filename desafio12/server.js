/* -- DEPENDENCIAS -- */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import path from 'path';
const __dirname = path.resolve();

import router from './routes/productosRouter.js';
import { productosArray } from './controllers/Producto.js';
const array = productosArray;
console.log(array)
// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/productos', router);

/* -- ARCHIVOS ESTATICOS --*/
app.use(express.static(path.join(__dirname, 'public')));

/* ---- SERVIDOR ---- */
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor HTTP en puerto: ${server.address().port}`);
    console.log('Para cancelar el server presionar CTRL + C');
})
server.on("error", error => console.log(`Error en servidor ${error}`));

/* -- WEBSOCKETS -- */
io.on('connection', socket => {
    console.log(`Cliente ID:${socket.id} inició conexión`)
    
    socket.on('message', (data) => {
        //console.log(data)
        io.sockets.emit('message', data)
    });

    socket.on('addProductos', () => {
        //console.log(data)
        io.sockets.emit('addProductos', array)
    })
});

