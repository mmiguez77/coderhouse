const socket = io.connect();

let pantalla = document.getElementById('pantalla'); // referencia del btn que envia los msg
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
        return (`
        <div>
        Usuario: <strong style="color:blue">${elem.user}</strong></span>
        (a las <span>${newDate.toString()}</span>)
        dijo: <i style="color:green">${elem.mensaje}</i></div>`);
    }).join(' ');
    document.getElementById('pantalla').innerHTML = html;
}

socket.on('new-message-server', (data) => {
    renderMessage(data)
});


// mensajes en DB
function oldMsg(data) {
    let html = data.map((elem, i) => {
        return (`
        <div>
        Usuario: <strong style="color:blue">${elem.message.user}</strong></span>
        (a las <span>${newDate.toString()}</span>)
        dijo: <i style="color:green">${elem.message.mensaje}</i></div>`);
    }).join(' ');
    document.getElementById('pantallaOld').innerHTML = html;
}

document.getElementById("btnOldMsg").addEventListener("click", function () {
    fetch('http://localhost:8080/mensajes')
        .then(res => res.json())
        .then(data => oldMsg(data))
        .catch(err => console.log(err))
});






