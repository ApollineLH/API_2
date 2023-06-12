const jwtUtils = require('../utils/jwtUtils');
const users = require('../config/users');

// Endpoint pour l'authentification et la génération du token JWT
function login(req, res) {
    const { name, password } = req.body;

    // Vérification des identifiants utilisateur
    const user = users.find(u => u.name === name && u.password === password);

    if (user) {
        // Génération du token JWT
        const token = jwtUtils.generateToken(user);

        res.json({ token });
    } else {
        res.status(401).json({ message: 'Identifiants invalides' });
    }
}

module.exports = {
    login
};
