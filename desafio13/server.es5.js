'use strict';

// LINK POSTMAN: https://www.getpostman.com/collections/63df217239eed29c7379

// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
var express = require('express');
var app = express();
var httpServer = require('http').createServer(app);
var io = require('socket.io')(httpServer);
var PORT = 8080;
var router = require('./routes/productos.routes.js');

var _require = require('./controllers/Producto.js'),
    productoArray = _require.productoArray,
    findAll = _require.findAll;

/* -- ARCHIVOS ESTATICOS -- */


app.use(express.static('public'));

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/api/productos', router);

/* -------------------- Web Sockets ---------------------- */
var mensajes = [];

io.on('connection', function (socket) {
    console.log('Cliente ID:' + socket.id + ' inici\xF3 conexi\xF3n');
    socket.emit('message', mensajes);
    socket.emit('all-productos', findAll());

    socket.on('new-message', function (data) {
        mensajes.push(data);
        io.sockets.emit('message', mensajes);
    });

    io.sockets.emit('all-productos', findAll());

    socket.on('update', function () {
        io.sockets.emit('updateProductos', findAll());
    });
});

/* ---- SERVIDOR ---- */
var server = httpServer.listen(PORT, function () {
    console.log('** Servidor HTTP en puerto: ' + server.address().port);
});
server.on("error", function (error) {
    return console.log('Error en servidor ' + error);
});
