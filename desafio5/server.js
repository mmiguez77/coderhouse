const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {

    res.end(app())
})

function app() {
    const id = numAlde1a10(1, 10);
    const title = "Producto " + numAlde1a10(1, 10);
    const price = numAlde0a1000(0, 1000);
    const thumbnail = "Foto " + numAlde1a10(1, 10);

    function numAlde1a10(min, max) {
        return Math.floor(Math.random() * (1 + max - min) + min);
    };
    //console.log(numAlde1a10(1, 10));

    function numAlde0a1000(min, max) {
        const num = (Math.random() * (1 + max - min) + min);
        return Number(num.toFixed(2))
    };
    //console.log(numAlde0a1000(0, 1000));

    const obj = {
        id,
        title,
        price,
        thumbnail,
    };
    //console.log(obj);

    return dataObj = JSON.stringify(obj);
}

server.listen(port, () => {
    console.log(`Conexión con puerto: ${port}, realizada con éxito`)
})

