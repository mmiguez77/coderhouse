/* -- DEPENDENCIAS -- */
const express = require ('express');
const { Server: HttpServer } = require ('http');
const { Server: IOServer } = require ('socket.io');
const session = require ('express-session');
const passport = require ('passport');
const cookieParser = require ('cookie-parser');
const flash = require ('connect-flash');
const morgan = require ('morgan');
//const passport = require('./passport/passport.js');
const config = require ('./config/index.js');

/* -- Rutas -- */
const router = require ('./routes/productos.routes.js');
const routerMsg = require ('./routes/mensajes.routes.js');
const usersRoutes = require ('./routes/users.routes.js');
const infoRouter = require ('./routes/info.routes.js');
const randomsRouter = require ('./routes/randoms.routes.js');

/* -- Controladores -- */
const Mensaje = require ('./controllers/Mensaje.js');
const Producto = require ('./controllers/Producto.js');
const msg = new Mensaje();
const prodClass = new Producto();

// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = config.PORT || 5000;

/* -- MIDDLEWARES -- */
app.use(cookieParser())
app.use(session({
    secret: 'secreto',
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 // tiempo en milisegundos (10 min = 60000 ms * 10)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(flash())
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.session = req.session
    next()
})

/* -- EJS -- */
app.set('views', './views');
app.set('view engine', 'ejs')

/* -- ENDPOINTS -- */
app.use('/api/productos', router);
app.use('/mensajes', routerMsg);
app.use('/user', usersRoutes)
app.use('/info', infoRouter)
app.use('/randoms', randomsRouter)
app.get('/', function (req, res) { res.render('index') });

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
