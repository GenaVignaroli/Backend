const express = require (`express`);
const routerProductos = require ( `./productos`);
const routerCarrito = require(`./carrito`)
const routerAuth = require(`./auth`)
const routerTest = require(`./test`)

const router = express.Router();

router.use(`/productos`, routerProductos);
router.use(`/carrito`, routerCarrito);
router.use(`/auth`, routerAuth);
router.use(`/test`, routerTest)

module.exports = router;