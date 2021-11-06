const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
const connection = require('./database/dbConnection');

var userRoutes = require('./routes/usersRoutes');
var imageRoutes = require('./routes/imagesRoutes');
var categorieRoutes = require('./routes/categorieRoutes');
var lotRoutes = require('./routes/lotRoutes');
var produitRoutes = require('./routes/produitRoutes');
var clientRoutes = require('./routes/clientRoutes');
var commissairePrisseurRoutes = require('./routes/commissairePriseurRoutes');
var gerantRoutes = require('./routes/gerantRoutes');
var vendeurRoutes = require('./routes/vendeurRoutes');
var authRoutes = require('./routes/authRoutes');
let local = require('./strategies/local');

const app = express();

app.use(express.json());
app.use(cors());

// connection do mongo database
connection();

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/lots', lotRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/commissaires_priseur', commissairePrisseurRoutes);
app.use('/api/gerants', gerantRoutes);
app.use('/api/vendeurs', vendeurRoutes);
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`API listening at http://localhost:${process.env.PORT}`);
});
