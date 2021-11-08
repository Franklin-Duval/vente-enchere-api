const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
const connection = require('./database/dbConnection');

var imageRoutes = require('./routes/imagesRoutes');
var categorieRoutes = require('./routes/gestionProduit/categorieRoutes');
var lotRoutes = require('./routes/gestionProduit/lotRoutes');
var produitRoutes = require('./routes/gestionProduit/produitRoutes');

var clientRoutes = require('./routes/gestionCompte/clientRoutes');
var commissairePrisseurRoutes = require('./routes/gestionCompte/commissaireRoutes');
var gerantRoutes = require('./routes/gestionCompte/gerantRoutes');
var vendeurRoutes = require('./routes/gestionCompte/vendeurRoutes');
var authRoutes = require('./routes/gestionCompte/authRoutes');

require('./strategies/local');

const app = express();

app.use(express.json());
app.use(cors());

// connection do mongo database
connection();

app.use(passport.initialize());

app.use('/api/auth', authRoutes);

//  auth middleware: All routes below are protected
app.use(passport.authenticate('jwt', { session: false }));

app.use('/api/images', imageRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/lots', lotRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/commissaires_priseur', commissairePrisseurRoutes);
app.use('/api/gerants', gerantRoutes);
app.use('/api/vendeurs', vendeurRoutes);

app.listen(process.env.PORT, () => {
  console.log(`API listening at http://localhost:${process.env.PORT}`);
});
