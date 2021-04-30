const socket = io.connect();

/* -- VARIABLES Y FUNCIONES FORMULARIO -- */
// let title = document.getElementById('title');
// let price = document.getElementById('price');
// let thumbnail = document.getElementById('thumbnail');
// let btnFormAdd = document.getElementById('btnForm');
// let table = document.getElementById('tableProd');

/* btnFormAdd.addEventListener('click', (e) => {
    //e.preventDefault();
    console.log(title.value, price.value, thumbnail.value);
    socket.emit('addProductos', {
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value,
    })
}); */

/* socket.on('addProductos', (data) => {
    console.log('client', data)
    table.innerHTML = `<p></p`
}); */

/* -- VARIABLES Y FUNCIONES CHAT --*/
let mensaje = document.getElementById('messageChat');
let usuario = document.getElementById('userChat');
let botonChat = document.getElementById('btnChat');
let pantalla = document.getElementById('pantalla');
let action = document.getElementById('action');

botonChat.addEventListener('click', () => {
    //console.log(mensaje.value, usuario.value);
    socket.emit('message', {
        usuario: usuario.value,
        mensaje: mensaje.value
    });
});

socket.on('message', (data) => {
    //console.log(data)
    pantalla.innerHTML += `<p>
    <span>${data.usuario}: ${data.mensaje}</span>
    </p>`
});