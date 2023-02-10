const router = require('express').Router();
const productController = require('../controllers/productController');
const { validateJWT } = require('../middlewares/authentication');

router.get('/products', validateJWT, productController.getAllProducts);
router.get('/products/:id', validateJWT, productController.getProductById);
router.post('/products', validateJWT, productController.createProduct);

module.exports = router;
