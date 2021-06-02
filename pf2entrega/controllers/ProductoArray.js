let productosArray = []

export default class Array {



/* ---- AGREGAR PRODUCTO ---- */
function add(data) {
    data.id = productosArray.length + 1;
    let newProducto = { ...data, id: data.id };
    productosArray.push(newProducto);
    return newProducto
}

/* ---- VER TOTAL DE PRODUCTOS ---- */
function findAll() {
    if (productosArray.length < 1) return false;
    return productosArray;
}

/* ---- VER PRODUCTO POR ID ---- */
function findByID(id) { return productosArray.filter((prod) => prod.id === parseInt(id))[0] }

/* ----  ELIMINAR PRODUCTO ---- */
function del(id) {
    const i = productosArray.findIndex(prod => prod.id == parseInt(id))
    if (i !== -1) {
        return productosArray.splice(i, 1)
    } else { return { error: 'producto no encontrado' } }
}

/* ----  ACTUALIZAR PRODUCTO ---- */
function update(id, data) {
    productosArray = productosArray.map(prod => {
        if (prod.id === parseInt(id)) {
            prod.title = data.title;
            prod.price = data.price;
            prod.thumbnail = data.thumbnail;
        }
        return prod
    });
}


}

