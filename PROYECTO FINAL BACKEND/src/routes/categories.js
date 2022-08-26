const Handler = require ('express-async-handler');
const { Router } = require ('express');
const { CategoryController } = require ('../controllers');

const router = new Router();

router.get('/', Handler(CategoryController.getAllCategories));
router.get('/:id', Handler(CategoryController.getCategoryById));
router.post('/create', Handler(CategoryController.createCategory));
router.put('/update/:id', Handler(CategoryController.updateCategory));
router.delete('/delete/:id', Handler(CategoryController.deleteCategory));

module.exports =  router;