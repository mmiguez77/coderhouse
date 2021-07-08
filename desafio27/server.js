/* -------------------- Dependencias ---------------------- */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import morgan from 'morgan';
import('./passport/passport.js');
import config from './config/index.js';
import cluster from 'cluster';
import * as os from 'os'
const numCPUs = os.cpus().length;

/* -------------------- Rutas ---------------------- */
import router from './routes/productos.routes.js';
import routerMsg from './routes/mensajes.routes.js';
import usersRoutes from './routes/users.routes.js';
import infoRouter from './routes/info.routes.js';
import randomsRouter from './routes/randoms.routes.js';

/* -------------------- Controllers ---------------------- */
import Mensaje from './controllers/Mensaje.js';
import Producto from './controllers/Producto.js';
const msg = new Mensaje();
const prodClass = new Producto();


/* -------------------- Configuracion Server ---------------------- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = parseInt(process.argv[2]) || config.PORT || 8080;


/* -------------------- Middlewares ---------------------- */
app.use(cookieParser())
app.use(session({
    secret: 'secreto',
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 /* (10 min = 60000 ms * 10)*/ }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
//app.use(express.static('public'));
app.use(flash())
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.session = req.session
    next()
})

/* -------------------- Ejs ---------------------- */
app.set('views', './views');
app.set('view engine', 'ejs')

/* -------------------- Endpoints ---------------------- */
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

/* -------------------- Servidor ---------------------- */
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor en Puerto ${PORT} - PID WORKER: ${process.pid}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));