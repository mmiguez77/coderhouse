// LINK POSTMAN: https://www.getpostman.com/collections/63df217239eed29c7379

// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const PORT: number = 8080;
const router = require ('./routes/productos.routes.js');
const {productoArray, findAll} = require ('./controllers/Producto.js');


/* -- ARCHIVOS ESTATICOS -- */
app.use(express.static('public'));

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/api/productos', router);

/* -------------------- Web Sockets ---------------------- */
const mensajes: any[] = []

io.on('connection', socket => {
    console.log(`Cliente ID:${socket.id} inició conexión`)
    socket.emit('message', mensajes)
    socket.emit('all-productos', findAll())

    socket.on('new-message', (data) => {
        mensajes.push(data)
        io.sockets.emit('message', mensajes)
    });

    io.sockets.emit('all-productos', findAll())

    socket.on('update', () => {
        io.sockets.emit('updateProductos', findAll())
    })
});


/* ---- SERVIDOR ---- */
const server = httpServer.listen(PORT, () => {
    console.log(`** Servidor HTTP en puerto: ${PORT}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));



