const express = require ('express');
//const Producto = require ('../controllers/Producto.js');
//const validate = require ('../middlewares/auth.js');
const router = express.Router();
const FactoryProducto = ('../factory/factoryProducto.js');

//* params para ingresar en new Producto según DB
//* 1 - MongoDB (Cloud) / 2 - FS / 3 - Sql Local / Array (default)

const nuevoProducto = new FactoryProducto();

router.post('/', nuevoProducto.add);
router.get('/', nuevoProducto.findAll);
router.get('/:id', nuevoProducto.findByID);
router.delete('/:id', nuevoProducto.deleteProd);
router.put('/:id', nuevoProducto.update);



module.exports = router;