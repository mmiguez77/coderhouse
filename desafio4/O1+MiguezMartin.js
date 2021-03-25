const texto = document.getElementById("texto")
//console.log(texto)

texto.addEventListener('keyup', (e) => {
    let valor = e.path[0].value;
    const textoNuevo = valor.split("").reverse().join("");
    document.querySelector('.textoEspejo').innerHTML = textoNuevo;
});