let contador = 0;
function mouseMove() {
    if (contador == 10) { // cantidad de segundos
        contador = 0;
        window.location.href = "/";
    } else {
        contador += 1;
    }
}

setInterval(mouseMove, 1000); 