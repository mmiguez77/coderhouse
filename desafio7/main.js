import express from 'express';
import fs from 'fs';

const PORT = 8080;
const app = express();

/* ---- FUNCION PARA LEER EL ARCHIVO Y CONVERTILO EN ARRAY ---- */
let newArr = [];
async function leer(url) {
    try {
        let texto = await fs.promises.readFile(url, 'utf-8');
        //console.log(texto);
        //console.log(typeof (texto));
        newArr = texto.split('},{')
        //console.log(newArr);
        // console.log(typeof (newArr));
        //console.log(newArr.length);
        return newArr
    } catch (err) {
        console.log('Archivo no encontrado ' + err);
    }
} leer('./productos.txt');

/* ---- PUNTO 1 ---- */
let itemsVisitas = 0;
let productos = ""
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

/* ---- PUNTO 2 ---- */
let randomVisitas = 0;
let itemRandom = ''
app.get('/item-random', (req, res) => {
    res.json(
        itemRandom = new Object({
            item: {
                producto: newArr[Math.floor(Math.random() * newArr.length)],
            }
        })
    );
    res.send(`Cantidad de visitas: ${++randomVisitas}`)
    console.log(itemRandom)
    return itemRandom;
})

/* ---- PUNTO 3 ---- */
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