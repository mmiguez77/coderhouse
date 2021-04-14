import express from 'express';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let productosArray = [];

/* A) Listar en forma total (get): '/api/productos' -> array de productos.
      si !prod: {error: 'producto no encontrado'} */
app.get('/api/productos', (req, res) => {
    if (productosArray.length < 1) {
        return res.status(404).json({
            error: 'Producto no encontrado',
        });
    } res.json(productosArray);
});
/* B) Listar en forma individual (get) (por id): '/api/productos/:id' -> devuelve el prod listado. 
      si !prod: {error: 'producto no encontrado'} */
app.get('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const prodFiltro = productosArray.filter((user) => user.id === parseInt(id))[0];
    if (prodFiltro) {
        return res.json(prodFiltro);
    }
    res.status(404).json({
        error: 'Producto no encontrado',
    });
});
// C) Almacenar un producto (post): '/api/productos' -> devuelve prod. agregado
app.post('/api/productos', (req, res) => {
    const data = req.body;
    data.id = productosArray.length + 1;
    productosArray.push(data);
    res.status(201).json(data);
});


const server = app.listen(PORT, () => {
    try {
        console.log(`Servidor conectado en puerto: ${PORT}`)
    } catch {
        error = console.log('Error: ' + error.toString());
    }
});

