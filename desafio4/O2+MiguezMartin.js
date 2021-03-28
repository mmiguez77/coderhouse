const { tap, map } = rxjs.operators;
const { Observable, pipe } = rxjs;

const espejarTexto = new Observable(suscriber => {
    console.log('Obs Creado');

    function textoInput() {
        let texto = document.querySelector('input').value;

        if (texto == 'error') {
            suscriber.error(texto);
        } else if (texto == 'complete') {
            suscriber.next('Continua el curso normal de la operacion');
        }
        suscriber.next(texto);

    }
    document.querySelector('input').addEventListener('input', textoInput);

    return () => {
        console.warn('Tiempo Agotado: Desuscripción Realizada');
        document.querySelector('input').value = "";
        document.querySelector('span').innerText = "";
        document.querySelector('input').disabled = "true";
    }
})



//Suscripcion
let suscripcion = espejarTexto
    .pipe(
        map((val) => val.split("").reverse().join("")),
        tap({
            next: val => console.log('*** Texto desde el TAP: ' + val.split("").reverse().join("")),
            error: error => console.error('*** Error desde el TAP: ¡Oh, no. Se produjo una falla!'),
        })
    )
    .subscribe(
        texto => {
            console.log(texto);
            document.querySelector('span').innerText = texto;
        }, error => console.error(error),
    );

//Desuscripción
setTimeout(() => {
    suscripcion.unsubscribe()
}, 30000);