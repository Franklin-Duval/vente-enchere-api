const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
const { Server } = require('socket.io');
const { createServer } = require('http');
const connection = require('./database/dbConnection');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

var imageRoutes = require('./routes/imagesRoutes');
var categorieRoutes = require('./routes/gestionProduit/categorieRoutes');
var lotRoutes = require('./routes/gestionProduit/lotRoutes');
var produitRoutes = require('./routes/gestionProduit/produitRoutes');

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
var connectionRoutes = require('./routes/gestionEnchere/connectionRoutes');

var optionsSwagger = require('./swagger.json');

require('./strategies/local');

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  console.log(socket.rooms, '--1--');

  socket.on('join_room', async (data) => {
    socket.join(data);
    console.log(`--> User with ID: ${socket.id} joined room: ${data}`);

    const num = await socket.in(data).allSockets();
    io.to(data).emit('count_clients', [...num]);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('send_bid', (data) => {
    socket.to(data.room).emit('receive_bid', data);
  });

  socket.on('disconnect', async () => {
    console.log('User Disconnected', socket.id);
  });
});

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
app.use('/api/connections', connectionRoutes);

const specs = swaggerJsDoc(optionsSwagger);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use('/', (req, res) => {
  res.redirect('/api-docs');
});

httpServer.listen(process.env.PORT, () => {
  console.log(`API listening at http://localhost:${process.env.PORT}`);
});
