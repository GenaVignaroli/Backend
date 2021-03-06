const express = require(`express`);
const {
  carritosController,
  productosController,
} = require(`../controllers/archivos/contrCarrito`);
const {isAdmin} = require("../middleware/isAdmin");
const {  bodyCarrito,
  getCarritos,
  crearCarrito,
  cargarProductos,
  borrarCarrito,} = require(`../controllers/mongo/carritos`)


const router = express.Router();

router.post(`/`, isAdmin, crearCarrito, async (req, res) => {
  const id = await carritosController.crearCarrito();

  res.json({
    msg: `Carrito creado!`,
    id: id,
  });
});

router.delete(`/:id`, borrarCarrito, isAdmin, async (req, res) => {
  const { id } = req.params;

  await carritosController.deleteCarrito(id);
  res.json({
    msg: `Carrito borrado existosamente!`,
  });
});

router.delete(`/:id/productos/:id_producto`,   isAdmin, async (req, res) => {
  const { id, id_producto } = req.params;

  const msg = await carritosController.borrarProductoDeCarrito(id, id_producto);
  res.json({
    msg: msg,
  });
});

router.get(`/:id/productos`, isAdmin, async (req, res) => {
  const { id } = req.params;

  const carrito = await carritosController.traerUnCarrito(id);

  if (!carrito)
    return res.status(404).json({
      msg: `Carrito no encontrado. Intenta nuevamente`,
    });

  res.json({
    data: carrito.productos,
  });
});

router.get(`/`, getCarritos, isAdmin, async (req, res)=>{
  const carritos = await carritosController.getAllCa();

  res.json({
    data: carritos,
  })
})

router.post(`/:id/productos`, isAdmin, cargarProductos, async (req, res) => {
  const { id } = req.params;
  const carrito = await carritosController.traerUnCarrito(id);
  if (!carrito)
    return res.status(404).json({
      msg: `Carrito no encontrado. Intenta nuevamente`,
    });

  const { productos } = req.body;
  if (!productos)
    return res.status(400).json({
      msg: `Por favor seleccionar productos para agregar al carrito`,
    });

  const respuesta = await carritosController.cargarProductos(id, productos);

  res.json({
    msg: respuesta,
  });
});

module.exports = router;
