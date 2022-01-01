const { Server } = require('socket.io');
const User = require('../models/gestionCompte/user');
const Participation = require('../models/gestionEnchere/participation');
const { JoinRoom } = require('./controller');

let currentBid = 0;

exports.RealTimeAuction = (httpServer) => {
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
      currentBid += 1;
      let participants = await JoinRoom(socket, data);
      io.to(data.room).emit('count_clients', participants);
      io.to(data.room).emit('send_bid', currentBid);
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
};
