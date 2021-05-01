const socket = io.connect();

/* -- VARIABLES Y FUNCIONES FORMULARIO -- */
// let title = document.getElementById('title');
// let price = document.getElementById('price');
// let thumbnail = document.getElementById('thumbnail');
// let btnFormAdd = document.getElementById('btnForm');
//let table = document.getElementById('tableProd');
let aviso = document.getElementById('aviso');

// btnFormAdd.addEventListener('click', (e) => {
//     e.preventDefault();
//     let producto = (title.value, price.value, thumbnail.value);
//     socket.emit('new-producto', producto)
//     return producto
// });

socket.on('all-productos', (data) => {
    console.log('** Array de Productos en client.js:', data)
    renderProducto(data)
});

function renderProducto(data) {
    console.log('renderProducto', data)
    let prod = data.map((elem,id) => {
        
        return (
            `<td>${elem.id}</td>   
        <td>${elem.title}</td>
        <td>${elem.price}</td>
        <td><img src= ${elem.thumbnail} style="width:32px; heigth:32px"></td>`);
    });
    document.getElementById('tableProd').innerHTML = prod;
}



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