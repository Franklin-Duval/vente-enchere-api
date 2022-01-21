const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
const { createServer } = require('http');
const { RealTimeAuction } = require('./socket/realTimeAuction');
const connection = require('./database/dbConnection');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

var imageRoutes = require('./routes/imagesRoutes');
var categorieRoutes = require('./routes/gestionProduit/categorieRoutes');
var lotRoutes = require('./routes/gestionProduit/lotRoutes');
var produitRoutes = require('./routes/gestionProduit/produitRoutes');
var eventRoutes = require('./routes/gestionProduit/eventRoutes');

var userRoutes = require('./routes/gestionCompte/userRoutes');
var commissaireRoutes = require('./routes/gestionCompte/commissaireRoutes');
var gerantRoutes = require('./routes/gestionCompte/gerantRoutes');
var vendeurRoutes = require('./routes/gestionCompte/vendeurRoutes');
var authRoutes = require('./routes/gestionCompte/authRoutes');
var compteRoutes = require('./routes/gestionCompte/compteRoutes');
var clientRoutes = require('./routes/gestionCompte/clientRoutes');

var commentaireRoutes = require('./routes/gestionEnchere/commentaireRoutes');
var feedbackRoutes = require('./routes/gestionEnchere/feedbackRoutes');
var rappelRoutes = require('./routes/gestionEnchere/rappelRoutes');
var salleEnchereRoutes = require('./routes/gestionEnchere/salleEnchereRoutes');
var participationRoutes = require('./routes/gestionEnchere/participationRoutes');

var walletRoutes = require('./routes/gestionPaiement/walletRoutes');
var transactionRoutes = require('./routes/gestionPaiement/transactionRoutes');

var logRoutes = require('./routes/gestionLog/logRoutes');

var optionsSwagger = require('./swagger.json');

require('./strategies/local');

const app = express();

const httpServer = createServer(app);
RealTimeAuction(httpServer);

app.use(express.json());
app.use(cors());

// connection do mongo database
connection();

app.use(passport.initialize());

app.use('/api/auth', authRoutes);

//  auth middleware: All routes below are protected
//  app.use(passport.authenticate('jwt', { session: false }));

app.use('/api/images', imageRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/lots', lotRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/users', userRoutes);
app.use('/api/commissaires', commissaireRoutes);
app.use('/api/gerants', gerantRoutes);
app.use('/api/vendeurs', vendeurRoutes);
app.use('/api/comptes', compteRoutes);
app.use('/api/commentaires', commentaireRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/rappels', rappelRoutes);
app.use('/api/salleEncheres', salleEnchereRoutes);
app.use('/api/participation', participationRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/transactions', transactionRoutes);

const specs = swaggerJsDoc(optionsSwagger);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use('/', (req, res) => {
  res.redirect('/api-docs');
});

httpServer.listen(process.env.PORT, () => {
  console.log(`API listening at http://localhost:${process.env.PORT}`);
});
