const { timeStamp } = require("console");
const e = require("express");
const fs = require(`fs`);
const { v4: uuid } = require(`uuid`);
const { productosController } = require(`../controllers/contrProductos`);

class Carrito {
  constructor(a) {
    this.carrito = a;
  }

  async obtenerCarritos() {
    const carrito = await fs.promises.readFile(this.carrito, `utf-8`);
    return JSON.parse(carrito);
  }

  async guardarCarrito(c) {
    await fs.promises.writeFile(this.carrito, JSON.stringify(c, null, `\t`));
  }

  async crearCarrito() {
    const carrito = await this.obtenerCarritos();

    const nuevoCarrito = {
      id: uuid(),
      timestamp: Date.now(),
      productos: [],
    };

    carrito.push(nuevoCarrito);

    await this.guardarCarrito(carrito);

    return nuevoCarrito.id;
  }

  async cargarProductos(id, idsRroductos) {
    var msgResp = "Ocurrio un error";
    const carritos = await this.obtenerCarritos();
    const productos = await productosController.obtenerProductos();

    const indice = carritos.findIndex((e) => e.id === id);
    const carritoObtenido = carritos[indice];

    idsRroductos.forEach((id) => {
      let prod = productos.find((e) => e.id === id);
      if (prod) carritoObtenido.productos.push(prod);
    });

    await this.guardarCarrito(carritos);

    msgResp = `Productos ${idsRroductos} guardados en el carrito ${id}`;

    return msgResp;
  }

  async deleteCarrito(n) {
    const carritos = await this.obtenerCarritos();

    const indice = carritos.findIndex((e) => e.id === n);
    carritos.splice(indice, 1);

    await this.guardarCarrito(carritos);
  }

  async traerUnCarrito(n) {
    const carrito = await this.obtenerCarritos();

    const i = carrito.findIndex((p) => {
      if (p.id === n) return true;
      else return false;
    });

    return carrito[i];
  }

  async borrarProductoDeCarrito(idCarrito, idProducto) {
    var msgResp = "Ocurrio un error";
    const carritos = await this.obtenerCarritos();

    const indice = carritos.findIndex((e) => e.id === idCarrito);
    const carritoObtenido = carritos[indice];

    const indice_producto = carritoObtenido.productos.findIndex(
      (e) => e.id === idProducto
    );
    carritoObtenido.productos.splice(indice_producto, 1);

    await this.guardarCarrito(carritos);

    msgResp = `Producto ${idProducto} eliminado del carrito ${idCarrito}`;
    return msgResp;
  }
}

const carritosController = new Carrito(`carritos.json`);
//const productosController = new Carrito(`productos.json`);

module.exports = {
  carritosController: carritosController,
  //productosController: productosController,
};
