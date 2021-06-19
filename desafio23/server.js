/* -- DEPENDENCIAS -- */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

// import path from 'path';
// const __dirname = path.resolve()

/* -- Importacion de Rutas -- */
import router from './routes/productos.routes.js';
import routerMsg from './routes/mensajes.routes.js';
import routerAccess from './routes/access.routes.js';

import Mensaje from './controllers/Mensaje.js';
const msg = new Mensaje();

import Producto from './controllers/Producto.js';
const prodClass = new Producto();

// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

/* -- MOONGOSE -- */
// const uri = 'mongodb://localhost:27017/ecommerce'
// const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
// mongoose.connect(uri, options)
//     .then(() => { console.log('Conectado a Mongoose para tabla ecommerce local') },
//         err => { err }
//     )

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* -- ENDPOINTS -- */
app.use('/api/productos', router);
app.use('/mensajes', routerMsg);
app.use('/access', routerAccess)

/* -- ARCHIVOS ESTATICOS -- */
app.use(express.static('public'));

/* -- EJS -- */
app.set('views', './views');
app.set('view engine', 'ejs')



/* -------------------- Web Sockets ---------------------- */

let toChat = []

io.on('connection', socket => {
    console.log(`Cliente ID:${socket.id} inició conexión`)
    io.sockets.emit('new-message-server', toChat)

    socket.on('new-message', async data => {
        const message = await data;
        toChat.push(data);
        msg.addMsg({ message })
        io.sockets.emit('new-message-server', toChat)
    });

    socket.on('new-producto', async data => {
        const producto = await data;
        prodClass.add({ producto })
        io.sockets.emit('new-prod-server', producto)
    });

});



/* ---- SERVIDOR ---- */
const server = httpServer.listen(PORT, () => {
    console.log(`** Servidor HTTP en puerto: ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));



