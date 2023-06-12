const express = require('express');
const authController = require('../controllers/authContoller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route pour l'authentification et la génération du token JWT
router.post('/login', authController.login);

module.exports = router;