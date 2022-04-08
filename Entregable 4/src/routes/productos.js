const express = require(`express`);
const { v4: uuid } = require(`uuid`)

class Productos {
    constructor() {
        this.productos = [{ id: "44746e65-8be4-47ff-b4f3-c47e84fac345", title: "pelota", price: 1000 },
         { id: "10c1a4a8-01e4-4ce5-abce-9274ca722373", title: "zapatilla", price: 10000 }
        ];
    }

    agregarProducto(item) {
        this.productos.push(item)
    }

    obtenerProductos() {
        return this.productos
    }

    editarProducto(itemEditado) {
        const item = this.productos.findIndex(id === itemEditado.id);

        if (item === null) {
            console.log("Producto no encontrado")
            return {
                msg: "Producto no encontrado",
                exito: false
            }
        };

        if (itemEditado.title) {
            item.title = itemEditado.title
        };

        if (itemEditado.price) {
            item.price = itemEditado.price
        };
        return {
            item: item,
            exito: true
        }
    }
}

const productos = new Productos()

const router = express.Router();

router.get(`/item`, (req, res) => {
    const resultado = productos.obtenerProductos();

    res.json({
        resultado,
    });
});

router.post(`/crear`, (req, res) => {
    const body = req.body;

    const nuevoProducto = {
        id: uuid(),
        title: body.title,
        price: body.price
    };

    productos.agregarProducto(nuevoProducto)
    res.json({
        nuevoProducto,
    });
});

router.put(`/modificar`, (req, res) => {
    console.log(req)
    const body = req.body;
    const resultado = productos.editarProducto(body)

    if (resultado.exito) {
        const item = resultado.item
        res.json({
            item,
        })
    }
    else {
        const msg = resultado.msg
        res.json({
            msg,
        })
    }
});

router.delete(`/borrar`, (req, res) => {

});

module.exports = router