const express = require('express');
const helloController = require('../controllers/helloController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route pour "hello world" avec vérification du token JWT
router.get('/hello', authMiddleware.verifyToken, helloController.sayHello);

module.exports = router;
