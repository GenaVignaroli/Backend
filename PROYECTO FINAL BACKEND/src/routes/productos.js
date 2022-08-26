const Handler = require ('express-async-handler');
const { Router } = require ('express');
const { ProductController } = require ('../controllers');

const router = new Router();

router.get('/', Handler(ProductController.getAllProducts));
router.get('/:id', Handler(ProductController.getProductById));
router.post('/create', Handler(ProductController.createProduct));
router.put('/update/:id', Handler(ProductController.updateProduct));
router.delete('/delete/:id', Handler(ProductController.deleteProduct));

module.exports = router;