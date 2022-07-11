const express = require (`express`);
const routerProductos = require ( `./productos`);
const routerCarrito = require(`./carrito`)
const routerAuth = require(`./auth`)

const router = express.Router();

router.use(`/productos`, routerProductos);
router.use(`/carrito`, routerCarrito);
router.use(`/auth`, routerAuth);

module.exports = router;