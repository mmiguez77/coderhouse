const socket = io.connect();

/* -- VARIABLES Y FUNCIONES FORMULARIO -- */
let title = document.getElementById('title');
let price = document.getElementById('price');
let thumbnail = document.getElementById('thumbnail');
let btnFormAdd = document.getElementById('btnForm');
let table = document.getElementById('tableProd');
let aviso = document.getElementById('aviso');

btnFormAdd.addEventListener('click', (e) => {
    //e.preventDefault();
    let producto = (title.value, price.value, thumbnail.value);
    socket.emit('new-producto', producto)
    return producto
});


socket.on('all-productos', (array) => {
    console.log('** Array de Productos en client.js:', array)


});

/* -- VARIABLES Y FUNCIONES CHAT --*/
let botonChat = document.getElementById('btnChat');
let pantalla = document.getElementById('pantalla');


botonChat.addEventListener('click', () => {
    let nuevoMensaje = {
        mensaje: document.getElementById('messageChat').value,
        usuario: document.getElementById('userChat').value
    };
    socket.emit('new-message', nuevoMensaje);
});

function render(data) {
    let html = data.map((elem, i) => {
        return (`<p>
        <strong>${elem.usuario}: </strong> <span>${elem.mensaje}</span>
        </p>`);
    }).join(' ');
    document.getElementById('pantalla').innerHTML = html;
}

socket.on('message', (data) => {
    render(data)
});