const socket = io.connect();

/* ------------------- FORMULARIO ------------------- */
let aviso = document.getElementById('aviso');

// ADD
socket.on('all-productos', (data) => {
    console.log('** Array de Productos en client.js:', data)
    renderProducto(data)
});

function renderProducto(data) {
    console.log('renderProducto', data)
    let prod = data.map((elem, id) => {
        return (
            `<tr><td>${elem.id}</td>
        <td>${elem.title}</td>
        <td>${elem.price}</td>
        <td><img src=${elem.thumbnail} style="width:32px; heigth:32px"></td></tr>`)
    });
    document.getElementById('tableProd').innerHTML = prod
}

// UPDATE
let btnUpdate = document.getElementById('btnUpdate');

btnUpdate.addEventListener('click', (e) => {
    location.reload();
});


/* ------------------- CHAT ------------------- */
let botonChat = document.getElementById('btnChat');
let pantalla = document.getElementById('pantalla');


botonChat.addEventListener('click', () => {
    let nuevoMensaje = {
        mensaje: document.getElementById('messageChat').value,
        usuario: document.getElementById('userChat').value
    };
    socket.emit('new-message', nuevoMensaje);
});

function renderMessage(data) {
    let html = data.map((elem, i) => {
        return (`<p>
        <strong>${elem.usuario}: </strong> <span>${elem.mensaje}</span>
        </p>`);
    }).join(' ');
    document.getElementById('pantalla').innerHTML = html;
}

socket.on('message', (data) => {
    renderMessage(data)
});