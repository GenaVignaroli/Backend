const e = require("express");
const express = require(`express`);
const { carritosController, productosController } = require(`../controllers/contrCarrito`);
//const { data } = require(`../../productos.json`)

const router = express.Router();

router.post(`/`, async (req, res)=> {
    const { productos } = req.body;
    console.log(productos)

    if(!productos)
    return res.json({
        msg: `No se puede crear un carrito vacio.`
    });

    await carritosController.crearCarrito(productos);

    res.json({
        msg: `Carrito creado y con productos cargados!`
    });
});

router.delete(`/:id`, async (req, res)=>{
    const { id } = req.params;

    await carritosController.deleteCarrito(id);
    res.json({
        msg: `Carrito borrado existosamente!`
    });
});

router.get(`/:id/productos`, async (req, res)=> {
    const { id } = req.params;

    const carrito = await carritosController.traerUnCarrito(id);

    if(!carrito)
    return res.status(404).json({
        msg:`Carrito no encontrado. Intenta nuevamente`
    });

    console.log(carrito)

    res.json({
        data: carrito,
    });
});

router.post(`/:id/productos`, async (req,res)=> {
    const { id } = req.params;
    const { productos } = req.body;

    await carritosController.cargarProductos(id, productos)
})

module.exports = router;