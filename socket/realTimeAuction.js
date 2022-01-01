const { Server } = require('socket.io');
const { JoinRoom } = require('./controller');

let currentBid = 0;
let currentProduct = {};

exports.RealTimeAuction = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });
  io.on('connection', (socket) => {
    socket.on('join_room', async (data) => {
      let participants = await JoinRoom(socket, data);
      io.to(data.room).emit('count_clients', participants);
      io.to(data.room).emit('receive_current_bid', currentBid);
      io.to(data.room).emit('receive_current_product', currentProduct);
    });

    socket.on('send_current_product', (data) => {
      currentProduct = data;
      socket.to(data.room).emit('receive_current_product', data);
    });

    socket.on('send_current_bid', (data) => {
      currentBid = data;
      socket.to(data.room).emit('receive_current_bid', data);
    });

    socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data);
    });

    socket.on('send_bid', (data) => {
      currentBid = data;
      socket.to(data.room).emit('receive_bid', data);
    });

    socket.on('disconnect', async () => {
      console.log('User Disconnected', socket.id);
    });
  });
};
