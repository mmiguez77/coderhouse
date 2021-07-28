/* -------------------- Dependencias ---------------------- */
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import history from 'connect-history-api-fallback'
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash'
import('./passport/passport.js')
const __dirname = path.resolve();

/* -------------------- Import Routes ---------------------- */
import productosRoutes from './routes/producto.routes.js';
import cartRoutes from './routes/carrito.routes.js'

/* -------------------- PORT ---------------------- */
const app = express();
const PORT = process.env.PORT || 5000; // si el puerto está ocupado utiliza otro

/* -------------------- Middlewares ---------------------- */
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
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(cors());
app.use(flash())
app.use((req, res,next) => {
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.welcome = req.flash('welcome')
    next()
})

/* -------------------- Endpoints ---------------------- */
//app.use('/', indexRoutes);
app.use('/api/productos', productosRoutes);
app.use('/cart', cartRoutes);
app.use('/user', usersRoutes);

/* -------------------- Static Files & Vue History ---------------------- */
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

///// VARIABLE ADMINISTRADORA  
const administrador = false;

/* -------------------- Server ---------------------- */
const server = app.listen(PORT, () => {
    console.log(`Servidor http en puerto: ${server.address().port}`)

})
server.on("error", error => console.log(`Error en servidor ${error}`))
