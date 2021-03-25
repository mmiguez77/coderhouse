function leerTexto(texto, tiempo, cb) {
    // abro el archivo de texto y lo separo en palabras
    let fs = require('fs');
    const archivo = fs.readFileSync(texto).toString()
    const palabras = archivo.split(" ")
    //console.log(palabras)

    for (let i = 0; i < palabras.length; i++) {
        setTimeout(() => {
            console.log(palabras[i]);
        }, ([i]) * tiempo);//recibe el parámetro del tiempo de ejecución
    }

    calculo = tiempo * palabras.length
    //console.log(calculo)

    setTimeout(() => {
        console.log(`***NOTA: Proceso completo del archivo ${texto}***`);// imprimo "proceso completo"
        console.log(`***NOTA: La cantidad de palabras recorridas en total fueron: ${palabras.length}***`);// mostro cantidad de palabras usadas
    }, calculo)

    setTimeout(cb, calculo);
}

leerTexto('texto1.txt', 200, () => {
    leerTexto('texto2.txt', 200, () => {
        leerTexto('texto3.txt', 200, () => {
            console.log("**NOTA FINAL: TOTAL DE LECTURAS COMPLETAS **")
        })
    })
});

