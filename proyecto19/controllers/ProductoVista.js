import faker from 'faker';

let productos = []
export default class ProductoVista {


    generator(quantity) {
        for (let id = 1; id <= quantity; id++) {
            const title = faker.commerce.productName()
            const price = faker.commerce.price()
            const thumbnail = faker.image.imageUrl()

            productos.push({
                _id: id,
                title: title,
                price: price,
                thumbnail: thumbnail
            })
        }
        
    }

    productGenerator = (req, res) => {
        const cantidad = parseInt(req.query.cant)
        switch (cantidad) {
            case 0:
                res.status(400).json({ mensaje: 'Valor 0 no asignable' })
                break;
            case cantidad:
                this.generator(cantidad)
                res.status(200).json({ mensaje: `${cantidad} Productos generados` })
                break
            default:
                this.generator(10)
                res.status(200).json({ mensaje: '10 Productos generados' })
                break;
        }
    }


    async add(req, res) {
        try {
            if (!req) {
                return res.status(400).json({ mensaje: 'No se ha podido agregar nuevo producto', error });
            }
            const data = await { ...req.body }
            const _id = productos.length + 1;
            let newProducto = await { ...data, _id };
            productos.push(newProducto);
            return res.status(200).json(newProducto)
        } catch (error) {
            console.log(error)
        }
    }

    findAll(req, res) {
        if (productos.length < 1) {
            return res.status(400).json({ mensaje: "No hay productos cargados" })
        };
        return res.status(200).json(productos);
    }

    async findByID(req, res) {
        try {
            if (!req) {
                return res.status(400).json({ mensaje: 'No se ha podido agregar nuevo producto', error });
            } else {
                const _id = await req.params.id
                let prodById = await productos.find(prod => prod._id == parseInt(_id))
                return res.status(200).json(prodById)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProd(req, res) {
        try {
            const _id = req.params.id
            const i = productos.findIndex(prod => prod._id == parseInt(_id))
            if (i !== -1) {
                let prodDrop = productos.splice(i, 1)
                return res.status(200).json(prodDrop)
            } else { return { error: 'producto no encontrado' } }
        } catch (error) {
            console.log(error)
        }
    }

    async update(req, res) {
        try {
            const _id = parseInt(req.params.id)
            const newProd = await { _id, ...req.body }
            const index = productos.findIndex(p => p._id == _id)
            if (index !== -1) {
                productos.splice(index, 1, newProd)
                return res.status(200).json(newProd)
            } else {
                return { error: 'producto no encontrado' }
            }
        } catch (error) {
            console.log(error)
        }
    }
}


