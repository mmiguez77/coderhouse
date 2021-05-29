const socket = io.connect();

/* ------------------- CHAT ------------------- */

let botonChat = document.getElementById('btnChat'); // referencia del btn que envia los msg
botonChat.addEventListener('click', () => { validar() }); // al apretar el boton ejecuta la fn valida()

// Funcion que valida que los input no esten vacios y si estan OK envia la informacion al server
function validar() {
    let user = document.getElementById('userChat').value
    let mensaje = document.getElementById('messageChat').value
    if (mensaje === "" || user === "") {
        alert(`CAMPOS REQUERIDOS`)
    } else {
        let nuevoMensaje = {
            user: document.getElementById('userChat').value,
            mensaje: document.getElementById('messageChat').value
        };
        socket.emit('new-message', nuevoMensaje);
        document.getElementById('messageChat').value = ""
    }
}

// Generar la fecha
let date = new Date()
newDate = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()].join('/') + ' ' +
    [date.getHours(),
    date.getMinutes(),
    date.getSeconds()].join(':');

//Funcion que renderiza el array que viene del server para poder ser visto en el document
function renderMessage(data) {

    let html = data.map((elem, i) => {
        console.log('ELEMENTO', elem.user);
        // return (`
        // <div>
        // Usuario: <strong style="color:blue">${elem.user}</strong></span>
        // (a las <span>${newDate.toString()}</span>)
        // dijo: <i style="color:green">${elem.mensaje}</i></div>`);
    })/* .join(' ');
    document.getElementById('pantalla').innerHTML = html; */
}

socket.on('message', (data) => {
    console.log(data)
    //renderMessage(data)

});




