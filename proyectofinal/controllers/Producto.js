import fs from 'fs'
export let productos = []


    /* ---- VER TODOS LOS PRODUCTOS ---- */
export const viewAll = async (req, res) => {
        try {
            const prodEnJson = await fs.promises.readFile('productos.json', 'utf-8');
            const jsonToArray = JSON.parse(prodEnJson)
            for (let i = 0; i < jsonToArray.length; i++) {
                console.log('Class Producto',jsonToArray)
                productos.push(jsonToArray)  
            }
        } catch (error) {
            console.log(`Error en la carga de productos ${error}`)
        }

            
      
} 
viewAll()

 
    /* ---- AGREGAR PRODUCTO ---- */
export const add = async (req, res) => {
        try {
            if(!req.body) {
                return res.status(400).json({ error: 'Campos incompletos'});
            } else  {
            let newProducto = await {...req.body };
            newProducto.id = productos.length + 1;
            newProducto.timestamp = new Date();
            productos.push(newProducto)
            const arrayToJson = JSON.stringify(productos);
            fs.writeFileSync('productos.json', arrayToJson, 'utf-8')
            res.redirect('/');
            }
        } catch (err) {
            console.log(err);
        }
    }



    /* ---- VER PRODUCTO POR ID ---- */


    /* ---- ELIMINAR PRODUCTO ---- */

    /* ---- MODIFICAR PRODUCTO ---- */






    /*viewByID(id) { return productosArray.filter((prod) => prod.id === parseInt(id))[0] }
 
    
    delete(id) {
        const i = productosArray.findIndex(prod => prod.id == parseInt(id))
        if (i !== -1) {
            return productosArray.splice(i, 1)
        } else { return { error: 'producto no encontrado' } }
    }
 
    
    update(id, data) {
        productosArray = productosArray.map(prod => {
            if (prod.id === parseInt(id)) {
                prod.title = data.title;
                prod.price = data.price;
                prod.thumbnail = data.thumbnail;
            }
            return prod
        });
    } */


/* class Archivo {
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
            await fs.promises.appendFile(urlWrite, `${this.array}`);
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


} */