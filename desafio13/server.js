"use strict";
// LINK POSTMAN: https://www.getpostman.com/collections/63df217239eed29c7379
exports.__esModule = true;
/* -- DEPENDENCIAS -- */
var express = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var path = require("path");
var __dirname = path.resolve();
var productos_routes_js_1 = require("./routes/productos.routes.js");
var Producto_js_1 = require("./controllers/Producto.js");
var productos = new Producto_js_1["default"]();
//console.log('** Console.log de productosArray en Server.js', productosArray.viewProductos())
// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
var app = require("express");
var httpServer = new http_1.Server(app);
var io = new socket_io_1.Server(httpServer);
var PORT = 8080;
/* -- ARCHIVOS ESTATICOS -- */
app.use(express.static('public'));
/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* -- ENDPOINTS -- */
app.use('/api/productos', productos_routes_js_1["default"]);
/* -------------------- Web Sockets ---------------------- */
var mensajes = [];
io.on('connection', function (socket) {
    console.log("Cliente ID:" + socket.id + " inici\u00F3 conexi\u00F3n");
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
    console.log("** Servidor HTTP en puerto: " + PORT);
});
server.on("error", function (error) { return console.log("Error en servidor " + error); });
