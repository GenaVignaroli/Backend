const Handler = require ('express-async-handler');
const { Router } = require ('express');
const { CartController } = require ('../controllers');

const router = new Router();

router.get('/', Handler(CartController.getCart));
router.post('/add', Handler(CartController.addProduct));
router.post('/remove', Handler(CartController.deleteProduct));
router.post('/order', Handler(CartController.createOrder));

module.exports = router;