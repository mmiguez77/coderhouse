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
import path from 'path';
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

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

/* -- ENDPOINTS -- */
app.use('/api/productos', router);
app.use('/mensajes', routerMsg);

/* -- ARCHIVOS ESTATICOS -- */
app.use(express.static('public'));

/* -- EJS -- */
app.set('views', './public');
app.set('view engine', 'ejs')

/* -- SESSION STORAGE -- */

app.use(session({
    name: 'Desafio21',
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 10000, //60000 = 1 minuto
    }
}))

app.get('/login', (req, res) => {
    req.session.user = req.query.user
    if (req.session.user) {
        res.render('login', { name: req.session.user })
        if (!req.session.user) {
            res.redirect('/')
        }
    }
    else {
        res.send(`Error en el Login`)
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ error: 'Error' })
        } else {
            //let name = req.query.name
            //res.render('logout', { name })
            return setTimeout(() => {
                res.redirect('/')
            }, 2000);
        }
    })
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



