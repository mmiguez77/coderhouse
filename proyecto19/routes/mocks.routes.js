import express from 'express';
import ProductoVista from '../controllers/ProductoVista.js';
const routerMocks = express.Router();
const prodMock = new ProductoVista()


routerMocks.post('/', prodMock.add);
routerMocks.get('/faker/:cant?', prodMock.productGenerator);
routerMocks.get('/', prodMock.findAll);
routerMocks.get('/:id', prodMock.findByID);
routerMocks.delete('/:id', prodMock.deleteProd);
routerMocks.put('/:id', prodMock.update);



export default routerMocks;