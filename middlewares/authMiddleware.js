require('dotenv');
const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {

    const token = req.headers.authorization ;
    console.log(token);
    

    // Vérifiez si la route est exclue de l'authentification
    if (req.path === '/api/auth/login') {
        return next();
    }

    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    try {
        const splitTOken= token.split(' ')
        const finalToken = splitTOken[1]
        const decoded = jwt.verify(finalToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(401).json({ message: 'Token invalide' });
    }
}

module.exports = {
    verifyToken
};
