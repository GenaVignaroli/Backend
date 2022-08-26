const { Router } = require ('express');
const AuthRouter = require ('./auth');
const ProductsRouter = require ('./productos');
const CategoriesRouter = require ('./categories');
const CartRouter = require ('./carrito');
const { isLoggedIn } = require ('../config/isAdmin');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const router = Router();
//SWAGGER CONFIG
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

//ROUTER
router.get('/hello', (req, res) => {
  res.json({ msg: 'HOLA', session: req.session });
});

router.use('/auth', AuthRouter);
router.use('/products', ProductsRouter);
router.use('/categories', CategoriesRouter);
router.use('/cart', isLoggedIn, CartRouter);

module.exports = router;