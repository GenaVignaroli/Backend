const express = require(`express`);
const { v4: uuid } = require(`uuid`);

class Productos {
  constructor() {
    this.productos = [];
  }

  agregarProducto(item) {
    this.productos.push(item);
  }

  obtenerProductos() {
    return this.productos;
  }

  editarProducto(itemEditado) {
    const index = this.productos.findIndex(
      (item) => item.id === itemEditado.id
    );

    if (index >= 0) {
      if (!!itemEditado.title) {
        this.productos[index].title = itemEditado.title;
      }

      if (!!itemEditado.price) {
        this.productos[index].price = itemEditado.price;
      }
      return {
        item: this.productos[index],
        exito: true,
      };
    }
    return {
      msg: "Producto no encontrado",
      exito: false,
    };
  }

  eliminarProducto(id) {
    const index = this.productos.findIndex((item) => item.id === id);

    if (index >= 0) {
      const del_res = this.productos.splice(index, 1);
      //console.log(del_res);
      //console.log("Producto eliminado");
      return {
        msg: "Producto " + id + " eliminado",
        exito: true,
      };
    } else {
      console.log("Producto no encontrado");
      return {
        msg: "Producto no encontrado",
        exito: false,
      };
    }
  }
}

const productos = new Productos();

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
    price: body.price,
  };

  productos.agregarProducto(nuevoProducto);
  res.json({
    nuevoProducto,
  });
});

router.post(`/modificar`, (req, res) => {
  const body = req.body;
  const resultado = productos.editarProducto(body);

  if (resultado.exito) {
    const item = resultado.item;
    res.json({
      item,
    });
  } else {
    const msg = resultado.msg;
    res.json({
      msg,
    });
  }
});

router.post(`/borrar`, (req, res) => {
  const body = req.body;
  console.log(body.id);
  const resultado = productos.eliminarProducto(body.id);
  const msg = resultado.msg;
  res.json({
    msg,
  });
});

module.exports = router;
