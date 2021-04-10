import fs from 'fs';

async function leer(url) {
    try {
        let texto = await fs.promises.readFile(url, 'utf-8');
        console.log(typeof (texto));
        let newObj = JSON.parse(texto);

        console.log(newObj);

        /* newObj.pop();
        console.log(newObj); */


        // const obj = new Object({
        //     items: newObj,



        // });
        // console.log(obj.items.length);

        //array.push(newArray);
    } catch (err) {
        //let arrayVacio = new Array();
        //array.push(arrayVacio);
        console.log('Archivo no encontrado ' + err);
    }
}

leer('./productos.txt')

