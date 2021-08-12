const logger = require('../helpers/winston.js');
let productosArray = []

async function addPersistenceProducto(dataToDb) {
    try {
        let newProducto = await { ...dataToDb};
        productosArray.push(newProducto);
    } catch (error) {
        logger.error.error(error);
    }
}

async function findAllPersistenceProducto() {
    try {
        return productosArray;
    } catch (error) {
        logger.error.error(error);
    }
}

async function findByIDPersistenceProducto(_id) {
    try {
        const _id = await req.params.id
        let prodById = await productosArray.find(prod => prod._id == parseInt(_id))
        return prodById
    } catch (error) {
        logger.error.error(error);
    }
}

async function deletePersistenceProducto(_id) {
    try {        
        const i = productosArray.findIndex(prod => prod._id == parseInt(_id))
        if (i !== -1) {
        let prodDrop = productosArray.splice(i, 1)
        return prodDrop}
    } catch (error) {
        logger.error.error(error);
    }
}

async function updatePersistenceProducto(_id, data) {
    try {
        const newProd = { _id, ... req.body }
        const index = productosArray.findIndex(p => p._id == _id)
        if (index !== -1) {
            productosArray.splice(index, 1, newProd)
            return newProd} 
    } catch (error) {
        logger.error.error(error);
    }
}

module.exports = {
    addPersistenceProducto,
    findAllPersistenceProducto,
    deletePersistenceProducto,
    updatePersistenceProducto,
    findByIDPersistenceProducto
}