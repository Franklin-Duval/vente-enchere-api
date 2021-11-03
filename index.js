const express = require('express');
const cors = require('cors');
const connection = require('./database/dbConnection');

var userRoutes = require('./routes/usersRoutes');
var imageRoutes = require('./routes/imagesRoutes');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// connection do mongo database
connection();

app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
