require('dotenv');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helloRoutes = require('./routes/helloRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

// Configuration Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation de l\'API'
    }
  },
  apis: ['./routes/*.js'] // Chemin vers les fichiers contenant les routes à documenter
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Route pour la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
