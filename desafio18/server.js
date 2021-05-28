/* -- DEPENDENCIAS -- */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import router from './routes/productos.routes.js'
import mongoose from 'mongoose';

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


/* -------------------- Web Sockets ---------------------- */

let mnjDB = []

io.on('connection', socket => {
    console.log(`Cliente ID:${socket.id} inició conexión`)
    // socket.emit('message', mnjDB)
    socket.emit('all-productos', )

    // socket.on('new-message', async (data) => {
    //     mnjDB.push(data)
    //     await newMessage(data)
    //     io.sockets.emit('message', mnjDB )
    // });

    io.sockets.emit('all-productos', )
    socket.on('update', () => {
        io.sockets.emit('updateProductos', )
    })

    // io.on('disconnect', async () => {
    //     console.log(`Cliente ID:${socket.id} desconectado`)
    //     await close()
    // })
});



/* ---- SERVIDOR ---- */
const server = httpServer.listen(PORT, () => {
    console.log(`** Servidor HTTP en puerto: ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));



