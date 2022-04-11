const express = require(`express`);

class Productos {
  constructor() {
    this.productos = [];
  }

  agregarProducto(item) {
    this.productos.push(item);
  }

  obtenerProductos() {
    console.log(this.productos)
    return this.productos;
  }

}

const productos = new Productos();

const router = express.Router();

router.get(`/mostrarProducto`, (req, res) => {
  const body = req.body;
  const resultado = productos.obtenerProductos();
  console.log(resultado)
  res.render(`mostrarProducto.pug`, {title: body.tile, price: body.price} )
});

router.get(`/cargarProducto`, (req, res) => {
  const body = req.body;

  const nuevoProducto = {
    title: body.title,
    price: body.price,
  };

  productos.agregarProducto(nuevoProducto);
  res.render(`cargarProducto.pug`, nuevoProducto)
});


module.exports = router;
