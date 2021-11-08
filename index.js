const express = require('express');
const cors = require('cors');
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

const app = express();

app.use(express.json());
app.use(cors());

// connection do mongo database
connection();

app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/lots', lotRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/commissaires_priseur', commissairePrisseurRoutes);
app.use('/api/gerants', gerantRoutes);

app.listen(process.env.PORT, () => {
  console.log(`API listening at http://localhost:${process.env.PORT}`);
});
