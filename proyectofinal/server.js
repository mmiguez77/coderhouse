/* -- DEPENDENCIAS -- */
import express from 'express';
import productosRoutes from './routes/producto.routes.js';
import path from 'path';
const __dirname = path.resolve();

// COMIENZO APP
/* -- PUERTO DEL SERVER -- */
const app = express();
const PORT = 8080;

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/productos', productosRoutes);

/* -- EJS -- */
app.set('view engine', 'ejs');
app.set('views', './views')
app.get('/', (req, res) => {res.render('pages/index')}); 

/* ---- SERVIDOR ---- */
const server = app.listen(PORT, () => {
    console.log(`Servidor http en puerto: ${server.address().port}`)
    
}) 
server.on("error", error => console.log(`Error en servidor ${error}`))



