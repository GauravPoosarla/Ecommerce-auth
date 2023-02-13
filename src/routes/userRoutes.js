const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.removeUser);

router.post('/login', userController.login);
router.post('/addToCart/:name', userController.addToCart);

module.exports = router;