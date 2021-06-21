/* -- DEPENDENCIAS -- */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import morgan from 'morgan';
import MongoStore from 'connect-mongo';
import session from 'express-session';

/* -- Importacion de Rutas -- */
import router from './routes/productos.routes.js';
import routerMsg from './routes/mensajes.routes.js';
import usersRoutes from './routes/users.routes.js';
import Mensaje from './controllers/Mensaje.js';
import Producto from './controllers/Producto.js';
const msg = new Mensaje();
const prodClass = new Producto();

// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

/* -- EJS -- */
app.set('views', './views');
app.set('view engine', 'ejs')

/* -- ENDPOINTS -- */
app.use('/api/productos', router);
app.use('/mensajes', routerMsg);
app.use('/user', usersRoutes)
app.get('/', function(req, res) {
    res.render('index');
});

/* -- SESSION -- */
const uri = 'mongodb://localhost:27017/session'
const options = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(session({
    store: MongoStore.create({
        mongoUrl: uri,
        mongoOptions: options,
        ttl: 60 * 10, // en segundos
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))

/* -- ARCHIVOS ESTATICOS -- */
app.use(express.static('public'));




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



