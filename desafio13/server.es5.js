'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _socket = require('socket.io');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _productosRoutes = require('./routes/productos.routes.js');

var _productosRoutes2 = _interopRequireDefault(_productosRoutes);

var _Producto = require('./controllers/Producto.js');

var _Producto2 = _interopRequireDefault(_Producto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// LINK POSTMAN: https://www.getpostman.com/collections/63df217239eed29c7379

/* -- DEPENDENCIAS -- */
var __dirname = _path2.default.resolve();

var productos = new _Producto2.default();
//console.log('** Console.log de productosArray en Server.js', productosArray.viewProductos())


// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
var app = (0, _express2.default)();
var httpServer = new _http.Server(app);
var io = new _socket.Server(httpServer);
var PORT = 8080;

/* -- ARCHIVOS ESTATICOS -- */
app.use(_express2.default.static('public'));

/* -- MIDDLEWARES -- */
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/api/productos', _productosRoutes2.default);

/* -------------------- Web Sockets ---------------------- */
var mensajes = [];

io.on('connection', function (socket) {
    console.log('Cliente ID:' + socket.id + ' inici\xF3 conexi\xF3n');
    socket.emit('message', mensajes);
    socket.emit('all-productos', productos.findAll());

    socket.on('new-message', function (data) {
        mensajes.push(data);
        io.sockets.emit('message', mensajes);
    });

    io.sockets.emit('all-productos', productos.findAll());

    socket.on('update', function () {
        io.sockets.emit('updateProductos', productos.findAll());
    });
});

/* ---- SERVIDOR ---- */
var server = httpServer.listen(PORT, function () {
    console.log('** Servidor HTTP en puerto: ' + server.address().port);
});
server.on("error", function (error) {
    return console.log('Error en servidor ' + error);
});
