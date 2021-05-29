/* -- DEPENDENCIAS -- */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import router from './routes/productos.routes.js'
import routerMsg from './routes/mensajes.routes.js'
import mongoose from 'mongoose';

import Mensaje from './controllers/Mensaje.js';
const msg = new Mensaje();

import Producto from './controllers/Producto.js';
const producto = new Producto();


// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

/* -- MOONGOSE -- */
const uri = 'mongodb://localhost:27017/ecommerce'
const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
mongoose.connect(uri, options).then(
    () => { console.log('Conectado a Mongo') },
    err => { err }
);

/* -- ARCHIVOS ESTATICOS -- */
app.use(express.static('public'));

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/api/productos', router);
app.use('/mensajes', routerMsg);


/* -------------------- Web Sockets ---------------------- */


io.on('connection', socket => {
    console.log(`Cliente ID:${socket.id} inició conexión`)
    socket.emit('message')


    socket.on('new-message', async data => {
        const user = await data.user;
        const mensaje = await data.mensaje
        console.log('DATA EN SERVER', user, mensaje)
        
        msg.addMsg({user, mensaje})
    });



});



/* ---- SERVIDOR ---- */
const server = httpServer.listen(PORT, () => {
    console.log(`** Servidor HTTP en puerto: ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));



