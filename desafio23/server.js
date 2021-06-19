/* -- DEPENDENCIAS -- */
const express = require('express');
const app = express();
const httpServer = require('http').Server(app)
const io = require('socket.io')(httpServer)
const MongoStore = require('connect-mongo');
const session = require('express-session');
const cookieParser = require('cookie-parser');

/* -- Importacion de Rutas -- */
const router = require ('./routes/productos.routes.js');
const routerMsg = require ('./routes/mensajes.routes.js');
const routerAccess = require ('./routes/access.routes.js');

const Mensaje = require ('./controllers/Mensaje.js');
const msg = new Mensaje();

const Producto = require ('./controllers/Producto.js');
const prodClass = new Producto();


/* -- MOONGOSE -- */
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

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


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
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`** Servidor HTTP en puerto: ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));



