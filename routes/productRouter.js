const productController = require('../controllers/productController');
const router = require('express').Router();

/** Routes */
router.get('/',productController.getAllProducts);
router.post('/',productController.addProduct);
router.post('/:id',productController.getProductById);
router.put('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProductById);

module.exports = router