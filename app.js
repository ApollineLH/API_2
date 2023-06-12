
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helloRoutes = require('./routes/helloRoutes');
const authRoutes = require ('./routes/authRoutes')
const authMiddleware = require('./middlewares/authMiddleware');

app.use(bodyParser.json());

// Middleware pour la vérification du token JWT
app.use(authMiddleware.verifyToken);

// Routes
app.use('/api', helloRoutes);
app.use('/api/auth', authRoutes);


// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur interne du serveur' });
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
