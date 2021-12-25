const User = require('../models/gestionCompte/user');
const Participation = require('../models/gestionEnchere/participation');

exports.JoinRoom = async (socket, data) => {
  const user = await User.findOne({ compte: data.compte });
  const participantExist = await Participation.findOne({
    salleEnchere: data.salleEnchere,
    username: data.username,
  });
  if (!participantExist) {
    const partipant = new Participation({
      salleEnchere: data.salleEnchere,
      username: data.username,
      date: data.date,
      user: user?._id,
    });
    partipant.save();
  }

  //create socket room
  socket.join(data.room);
  console.log(`--> User with ID: ${socket.id} joined room: ${data.room}`);

  return await Participation.find({
    salleEnchere: data.salleEnchere,
  });
};
