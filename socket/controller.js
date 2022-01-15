const User = require('../models/gestionCompte/user');
const Participation = require('../models/gestionEnchere/participation');
const SalleEnchere = require('../models/gestionEnchere/salleEnchere');
const Produit = require('../models/gestionProduit/produit');

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
      connected: true,
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

exports.AddBid = async (data) => {
  const salle = await SalleEnchere.findOne({ _id: data.room });
  const bids = salle.enchereEncours.bids;
  bids.push({
    user: data.user,
    bid: data.bid,
  });
  salle.enchereEncours = {
    montantMax: data.bid,
    bids,
    produit: data.produit,
  };
  salle.save();
};

exports.CurrentInfo = async (data) => {
  const salle = await SalleEnchere.findOne({ _id: data.room });
  const enchereEncours = salle.enchereEncours;
  const produit = await Produit.findOne({ _id: enchereEncours.produit });
  const info = {
    bid: enchereEncours.montantMax,
    produit,
  };
  return info;
};

exports.NewProduct = async (data) => {
  const salle = await SalleEnchere.findOne({ _id: data.room });
  salle.enchereEncours = {
    montantMax: data.currentProduct.prixMin,
    bids: [],
    produit: data.currentProduct,
  };
  salle.save();
};

exports.FinishProductAuction = async (data) => {
  const salle = await SalleEnchere.findOne({ _id: data.room });
  const enchereEncours = salle.enchereEncours;
  if (enchereEncours.bids.length > 0) {
    const winnerUser = enchereEncours.bids[enchereEncours.bids.length - 1].user;
    salle.gagnants.push({
      montant: enchereEncours.montantMax,
      user: winnerUser,
      produit: enchereEncours.produit,
    });
    salle.save();
  }
};
