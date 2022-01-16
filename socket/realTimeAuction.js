const { Server } = require('socket.io');
const {
  JoinRoom,
  AddBid,
  CurrentInfo,
  NewProduct,
  FinishProductAuction,
  ExitRoom,
} = require('./controller');

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
      const info = await CurrentInfo(data);
      io.to(data.room).emit('receive_current_product', {
        currentProduct: info.produit,
        bid: info.bid,
      });
    });

    socket.on('send_current_product', async (data) => {
      //used by admin to send current product for bid
      await FinishProductAuction(data);
      await NewProduct(data);
      socket.to(data.room).emit('receive_current_product', {
        currentProduct: data.currentProduct,
        bid: data.currentProduct.prixMin,
      });
    });

    socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data);
    });

    socket.on('send_bid', async (data) => {
      await AddBid(data);
      socket.to(data.room).emit('receive_bid', data);
    });

    socket.on('disconnect', async () => {
      let participants = await ExitRoom(socket);
      if (participants) {
        io.to(participants[0].salleEnchere.toString()).emit(
          'count_clients',
          participants,
        );
      }
      console.log('User Disconnected', socket.id);
    });
  });
};
