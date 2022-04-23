const express = require (`express`);
const routerProductos = require ( `./productos`);
const routerCarrito = require(`./carrito`)

const isAdmin = ((req, res, next)=> {
    if(true) {
        next();
    } else {
        res.status(403).send(`Crea un ususario o inicia sesión para seguir navegando!`)
    }
})

const router = express.Router();

router.use(`/productos`, routerProductos);
router.use(`/carrito`, routerCarrito)
router.use(`/carrito/:id`, isAdmin);

module.exports = router;