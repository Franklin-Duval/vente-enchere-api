const { Server } = require('socket.io');

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
};
