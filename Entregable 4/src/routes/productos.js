const express = require (`express`);

let productos = [];

const router = express.Router();

router.get(`/`, (req, res) => {
    res.json({
        productos,
    })
})

router.post(`/`, (req, res) => {
    const body = req.body;

    const nuevoProducto = {
        id: productos.length + 1, 
        nombre: body.nombre,
        precio: body.precio
    };

    productos.push(nuevoProducto);
    res.json({
        productos,
    })
})

router.put(`/`, (req, res) => {
    const editado = productos.map((producto) => producto.id)

    const body = req.body;

    const editarProducto = {
        id: editado,
        nombre: body.nombre,
        precio: body.precio
    }

    productos.push(editarProducto);
    res.json({
        productos,
    })
})

router.delete(`/`, (req, res) => {
    const body = req.body;

    const eliminarProducto = {
        id: body.id
    }

    productos.push(eliminarProducto);
    res.json({
        productos,
    })
})

module.exports = router