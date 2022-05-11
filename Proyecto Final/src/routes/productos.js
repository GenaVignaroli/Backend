const express = require(`express`);
const { productosController } = require(`../controllers/archivos/contrProductos`);
const isAdmin = require("../middleware/isAdmin");
const { bodyProducto,
  getProductos,
  getProductosById,
  cargarProductos,
  actualizarProducto,
  borrarProducto,} = require(`../controllers/mongo/productos`)

const router = express.Router();

router.get(`/`, getProductos, async (req, res) => {
  const producto = await productosController.getAll();
  res.json({
    data: producto,
  });
});

router.get(`/:id`, getProductosById, async (req, res) => {
  const { id } = req.params;

  const producto = await productosController.getByID(id);

  if (!producto)
    return res.status(404).json({
      msg: `Producto no encontrado. Intenta nuevamente`,
    });

  res.json({
    data: producto,
  });
});

router.post(`/`, isAdmin, bodyProducto, cargarProductos, async (req, res) => {
  const { id, timestamp, nombre, descripcion, codigo, url, precio, stock } =
    req.body;

  if (
    !id ||
    !timestamp ||
    !nombre ||
    !descripcion ||
    !codigo ||
    !url ||
    !precio ||
    !stock
  )
    return res.status(404).json({
      msg: `Completar todos los campos del producto!`,
    });

  const nuevoProducto = {
    id,
    timestamp,
    nombre,
    descripcion,
    codigo,
    url,
    precio,
    stock,
  };

  await productosController.cargarProducto(nuevoProducto);

  res.json({
    msg: `Producto cargado exitosamente! Muchas gracias!`,
  });
});

router.put(`/:id`, bodyProducto, actualizarProducto, async (req, res) => {
  const { timestamp, nombre, descripcion, codigo, url, precio, stock } =
    req.body;
  const { id } = req.params;

  const producto = await productosController.getByID(id);

  if (!producto)
    return res.status(404).json({
      msg: `Producto no encontrado. Intente nuevamente`,
    });

  if (
    !timestamp ||
    !nombre ||
    !descripcion ||
    !codigo ||
    !url ||
    !precio ||
    !stock
  )
    return res.status(404).json({
      msg: `Completar todos los campos del producto!`,
    });

  const productoEditado = {
    timestamp,
    nombre,
    descripcion,
    codigo,
    url,
    precio,
    stock,
  };

  const result = await productosController.edita(id, productoEditado);

  res.json({
    data: result,
  });
});

router.delete(`/:id`, isAdmin, borrarProducto, async (req, res) => {
  const { id } = req.params;

  await productosController.deleteByID(id);
  res.json({
    msg: `Producto eliminado!`,
  });
});

module.exports = router;
