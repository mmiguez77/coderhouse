let fs = require('fs');

class Archivo {
    constructor() {
        this.array = [];
    }

    generarObj(titulo, precio, imagen) {
        let obj = new Object({
            title: titulo,
            price: precio,
            thumbnail: imagen,
        })
        let objArray = JSON.stringify(obj);
        //console.log(objArray)
        this.array.push(objArray);
    }

    async guardar(urlWrite) {
        try {
            await fs.promises.appendFile(urlWrite, `${this.array.toString()}\n`) // ingreso el array al archivo.txt
        } catch (err) {
            console.log(err)
        }
    }

    async leer(url) {
        //let fs = require('fs');
        try {
            const archivo = await fs.promises.readFile(url, 'utf-8')
            //return console.log(archivo)
        } catch (err) {
            console.log(err)
        }
    }





    borrar() { }


}

const producto = new Archivo
producto.generarObj('Escuadra', 123.45, 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg')
producto.generarObj('Escua', 123., '.org/wikipedia/commons/3/3c/Squadra_45.jpg')

producto.guardar('./productos.txt')

producto.leer('./productos.txt')

