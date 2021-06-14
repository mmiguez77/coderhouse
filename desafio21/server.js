/* -- DEPENDENCIAS -- */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import mongoose from 'mongoose';
// import path from 'path';
// const __dirname = path.resolve()
import session from 'express-session';
import cookieParser from 'cookie-parser'

import router from './routes/productos.routes.js';
import routerMsg from './routes/mensajes.routes.js';

import Mensaje from './controllers/Mensaje.js';
const msg = new Mensaje();

import Producto from './controllers/Producto.js';
import { appendFile } from 'fs';
const prodClass = new Producto();

// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

/* -- MOONGOSE -- */
const uri = 'mongodb://localhost:27017/ecommerce'
const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
mongoose.connect(uri, options)
    .then(() => { console.log('Conectado a Mongo') },
        err => { err }
    )

/* -- ARCHIVOS ESTATICOS -- */
app.use(express.static('public'));

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

/* -- SESSION STORAGE -- */
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
}))

/* -- EJS -- */
app.set('views', './public');
app.set('view engine', 'ejs')

/* -- ENDPOINTS -- */
app.use('/api/productos', router);
app.use('/mensajes', routerMsg);

/* -- SESSION -- */

function showSession(req) {
    console.log('------------ req.session -------------')
    console.log(req.session)
  
    console.log('----------- req.sessionID ------------')
    console.log(req.sessionID)
  
    console.log('----------- req.cookies ------------')
    console.log(req.cookies)
  
    console.log('---------- req.sessionStore ----------')
    console.log(req.sessionStore)
  }

app.get('/', (req, res) => {
    res.render('log');
})

app.get('/login', (req, res) => {
    if (!req.query.name) {
        res.send('Error en el login')
    } else {
        showSession(req)
        req.session.name = req.query.name;
        
        res.render('login', { name: req.session.name })
    }
})

app.get('/logout', (req, res) => {
    showSession(req)
    req.session.destroy();
    let name = req.query.name
    res.render('logout', { name: name })
})


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



