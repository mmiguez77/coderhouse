import express from 'express';
import fs from 'fs';

const PORT = 8080;
const app = express();

let newArr = [];
async function leer(url) {
    try {
        let texto = await fs.promises.readFile(url, 'utf-8');
        //console.log(texto);
        //console.log(typeof (texto));
        newArr = texto.split('},{');
        JSON.parse(newArr)
        //console.log(newArr);
        //console.log(typeof (newArr));
        //console.log(newArr.length);
        //array.push(newArr)
    } catch (err) {
        console.log('Archivo no encontrado ' + err);
    }
} leer('./productos.txt');

let itemsVisitas = 0;
let productos
app.get('/items', (req, res) => {
    res.json(
        productos = new Object({
            visitas: {
                items: newArr,
                cantdad: newArr.length,
            }
        })
    );
    res.send(`Cantidad de visitas: ${++itemsVisitas}`)
    return productos;
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