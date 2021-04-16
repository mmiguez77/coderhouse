import express from 'express';
import { agregarProducto } from './class/Producto.js';

const app = express();
const PORT = 8080;

app.use('/api/', agregarProducto())
// app.use('/api/', nuevoProducto.verProductosPorId())
// app.use('/api/', nuevoProducto.agregarProducto())
// app.use('/api/', nuevoProducto.actualizarProducto())
// app.use('/api/', nuevoProducto.eliminarProducto())

app.use('/inicio', express.static('public'))

const server = app.listen(PORT, () => {
    console.log(`Servidor http en puerto: ${server.address().port}`)
}) 
server.on("error", error => console.log(`Error en servidor ${error}`))



