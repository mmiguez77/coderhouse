const socket = io.connect();

/* ------------------- FORMULARIO ------------------- */

// ADD
let btnAdd = document.getElementById('btnForm');

btnAdd.addEventListener('click', () => {
    socket.emit('nuevo-producto', () => {
        socket.on('all-productos', async (data) => {
             renderProducto(await data)})
    })
});

socket.on('all-productos', (data) => {
    if (data === false) {
        sinProd()
    } else {
        renderProducto(data)
    }
});

function renderProducto(data) {
    let prod = data.map((elem, id) => {
        return (
            `<tr><td>${elem.id}</td>
        <td>${elem.title}</td>
        <td>${elem.price}</td>
        <td><img src=${elem.thumbnail} style="width:32px; heigth:32px"></td></tr>`)
    });
    document.getElementById('tableProd').innerHTML = prod
}

function sinProd() {
    let aviso = document.getElementById('aviso');
    aviso.innerHTML = `<h3 class="alert alert-warning">No hay productos cargados</h3>`
    table.style.display = "none";
}

// UPDATE
let btnUpdate = document.getElementById('btnUpdate');

btnUpdate.addEventListener('click', () => {
    socket.emit('update')
    //location.reload();
});

socket.on('updateProductos', async (data) => {
    renderProducto(await data)
})

/* ------------------- CHAT ------------------- */
let botonChat = document.getElementById('btnChat');
let pantalla = document.getElementById('pantalla');

botonChat.addEventListener('click', () => { validar() });

// Funcion que valida que los input no esten vacios y si estan OK envia la informacion
function validar() {
    let usuario = document.getElementById('userChat').value
    let mensaje = document.getElementById('messageChat').value
    if (mensaje === "" || usuario === "") {
        alert(`CAMPOS REQUERIDOS`)
    } else {
        let nuevoMensaje = {
            usuario: document.getElementById('userChat').value,
            mensaje: document.getElementById('messageChat').value
        };
        socket.emit('new-message', nuevoMensaje);
        document.getElementById('messageChat').value = ""
    }
}

// Funcion para ver la fecha
let date = new Date()
newDate = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()].join('/') + ' ' +
    [date.getHours(),
    date.getMinutes(),
    date.getSeconds()].join(':');
console.log(newDate);

// Funcion que renderiza el array para poder ser visto
function renderMessage(data) {
    let html = data.map((elem, i) => {
        return (`
        <div>
        Usuario: <strong style="color:blue">${elem.usuario}</strong></span>
        (a las <span>${newDate.toString()}</span>)
        dijo: <i style="color:green">${elem.mensaje}</i></div>`);
    }).join(' ');
    document.getElementById('pantalla').innerHTML = html;
}

socket.on('message', (data) => {
    renderMessage(data)
});




