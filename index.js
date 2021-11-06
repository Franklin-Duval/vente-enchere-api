const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connection = require('./database/dbConnection');

var userRoutes = require('./routes/usersRoutes');
var imageRoutes = require('./routes/imagesRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// connection do mongo database
connection();

app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`API listening at http://localhost:${process.env.PORT}`);
});
