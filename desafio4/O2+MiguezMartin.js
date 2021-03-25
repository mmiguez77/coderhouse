const { Observable } = rxjs;

function espejarTexto() {
    return new Observable(suscriber => {

        function textoInput() {
            let texto = document.querySelector('input').value;
            let textoEspejado = texto.split('').reverse().join('');
            //console.log(texto)
            if (texto == 'error') {
                suscriber.error('Escribir la palabra ERROR produce un... ERROR');
            } else if (texto == 'complete') {
                suscriber.next('Continua el curso normal de la operacion' + textoEspejado);
            }
            suscriber.next(textoEspejado);

        }
        document.querySelector('input').addEventListener('input', textoInput);

        return () => {
            console.warn('Tiempo Agotado: Desuscripción Realizada');
            document.querySelector('input').removeEventListener('input', textoInput);
            document.querySelector('input').value = "";
            document.querySelector('span').innerText = "";
            document.querySelector('input').disabled = "true";
        }
    })
}

//Suscripcion
let suscripcion = espejarTexto()
    .subscribe(
        texto => {
            console.log(texto);
            document.querySelector('span').innerText = texto;
        }, error => console.error(error)
    );

//Desuscripción
setTimeout(() => {
    suscripcion.unsubscribe()
}, 30000);