const express = require('express');
const cors = require('cors');
const connection = require('./database/dbConnection');

var userRoutes = require('./routes/users');

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

// connection do mongo database
connection();

app.use('/lands', userRoutes);

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
