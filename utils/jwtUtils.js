require('dotenv').config();
const jwt = require('jsonwebtoken');
const users = require('../config/users');
const bcrypt = require('bcrypt');
// Génération d'un token JWT
function generateToken(user) {
    const payload = {
        id: user.id,
        name: user.name,
        isAdmin: user.isAdmin
    };
    const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

    return token;
}

// Vérification du mot de passe
async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

// Vérification du token JWT
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalide' });
    }
}

module.exports = {
    generateToken,
    verifyPassword,
    verifyToken
};
