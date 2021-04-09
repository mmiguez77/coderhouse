import express from 'express';
const PORT = 8080;

const app = express();

let itemsVisitas = 0
app.get('/items', (req, res) => {
    res.send(`Cantidad de visitas: ${++itemsVisitas}`)
})

let randomVisitas = 0
app.get('/item-random', (req, res) => {
    res.send(`Cantidad de visitas: ${++randomVisitas}`)
})

let count
app.get('/visitas', (req, res) => {
    res.json(
        count = new Object({
            visitas: {
                items: itemsVisitas,
                item: randomVisitas,
            }
        })
    );
    return count;
})

const server = app.listen(PORT, () => {
    console.log(`Servidor conectado en puerto: ${PORT}`)
});