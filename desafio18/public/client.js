const socket = io.connect();

/* ------------------- CHAT ------------------- */
let botonChat = document.getElementById('btnChat');
let pantalla = document.getElementById('pantalla');

botonChat.addEventListener('click', () => { validar() });

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

// Funcion para generar la fecha
let date = new Date()
newDate = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()].join('/') + ' ' +
    [date.getHours(),
    date.getMinutes(),
    date.getSeconds()].join(':');

// Funcion que renderiza el array para poder ser visto en el document
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

socket.on('message', (data) => {
    renderMessage(data)
});




