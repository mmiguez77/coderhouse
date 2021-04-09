let fs = require('fs');

class Archivo {
    constructor() {
        this.array = [];
    }
    crearObj(titulo, precio, imagen) {

        let obj = new Object(),
            title = titulo,
            price = precio,
            thumbnail = imagen,
            id = () => {
                let cont = this.array.length
                return cont + 1
            };
        obj['Title'] = title,
            obj['Price'] = price,
            obj['Thumbnail'] = thumbnail,
            obj['id'] = id();
        let objArray = JSON.stringify(obj);
        //console.log(objArray)
        this.array.push(objArray);
    } // método para cargar los productos en el array a traves de un objeto, segun la cantidad que se ejecutan se va autoincrementando el id

    async guardar(urlWrite) {
        try {
            await fs.promises.appendFile(urlWrite, `${this.array}\n`);
        } catch (err) {
            console.log('Se produjo un error al guardar el archivo' + err);
        }
    } // método para escribir la info del array en el archivo.txt

    async leer(url) {
        try {
            const texto = await fs.promises.readFile(url, 'utf-8');
            //console.log(texto);
            let newArray = texto.split('\n');
            newArray.pop();
            console.log(newArray);
            //array.push(newArray);
        } catch (err) {
            let arrayVacio = new Array();
            this.array.push(arrayVacio);
            console.log('Archivo no encontrado ' + err);
        }
    }// Método para leer el archivo txt. Lo limpio y leo por consola como un array. Caso que el archivo no exista genero un array nuevo vacío y lo envio al array general.

    borrar(url) {
        fs.unlink(url, error => {
            if (error) {
                console.log('No se pudo borrar el archivo ' + error)
            } else {
                console.log('Archivo borrado')
            }
        })
    }


}

const producto = new Archivo;

/* ---- 1) Bloque correspondiente a guardar la info dentro del txt ---- */

/*producto.crearObj('Escuadra', 50, 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg')
producto.crearObj('Lapiz', 120, 'https://www.misutiles.com/4291-thickbox_default/lapiz-staedtler-noris-n2-hb-unidad.jpg')
producto.crearObj('Goma', 30, 'https://officejob.com.ar/wp-content/uploads/2015/11/goma-maped-tinta.jpg')
producto.crearObj('Regla', 130, 'https://rfmayorista.com.ar/wp-content/uploads/2020/03/REGLA-ECONM_15-CM.-600x600.jpg')
producto.crearObj('Sacapuntas', 210, 'https://i.pinimg.com/originals/85/37/59/85375986b59536906fd4058df03decdf.jpg')
producto.crearObj('Cartuchera', 500, 'http://d3ugyf2ht6aenh.cloudfront.net/stores/839/516/products/jungla-cartuchera21-c929625a193ccd4a9f15492443234990-640-0.jpg')
producto.guardar('./productos.txt');
console.log(producto.array)*/

/* ---------------------------------------------------------------------------------------------------- */

/* ---- 2) Método correspondiente a leer el txt ---- */
//producto.leer('./productos.txt')

/* ---- 3) Elimina el txt ---- */
//producto.borrar('./productos.txt')
