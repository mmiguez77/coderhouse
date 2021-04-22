// LINK POSTMAN: https://www.getpostman.com/collections/63df217239eed29c7379

/* -- DEPENDENCIAS -- */
const express = require('express');
const app = express();
const productoRouter = require('./routes/productosRouter.js')
const indexRouter = require('./routes/indexRouter.js')
const path = require('path');
const handlebars  = require('express-handlebars');

// COMIENZO APP
/* -- PUERTO DEL SERVER -- */
const PORT = 8080;

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/api/productos', productoRouter);

/* -- STATIC FILES -- */
//app.use(express.static('public'));
app.use('/inicio', indexRouter ); //acceder a traves del puerto 8080/public

/* -- HANDLEBARS -- */
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
        extname: 'hbs',
        defaultLayout: 'index',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
);
app.set('views', './views')
app.get('/home', (req, res) => {
    res.render('main');
});

/* ---- SERVIDOR ---- */
const server = app.listen(PORT, () => {
    console.log(`Servidor http en puerto: ${server.address().port}`)
    console.log('Para cancelar el server presionar CTRL + C')
}) 
server.on("error", error => console.log(`Error en servidor ${error}`))



