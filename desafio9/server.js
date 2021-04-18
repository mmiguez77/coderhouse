// LINK POSTMAN: https://www.getpostman.com/collections/63df217239eed29c7379
const express = require('express');
const app = express();
const productoRouter = require('./routes/productosRouter.js')

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productoRouter);

/* ---- SERVIDOR ---- */
const server = app.listen(PORT, () => {
    console.log(`Servidor http en puerto: ${server.address().port}`)
}) 
server.on("error", error => console.log(`Error en servidor ${error}`))



