const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const ClientSchema = new Schema({ 
  produitsAchetes: [
    {
      type: Schema.Types.ObjectId,
      ref: COLLECTIONS.PRODUITS,
    },
  ],
  nombreProduitsAchetes: {
    type: Number,
    required: false,
    default: 0,
  },
  totalArgentDepense: {
    type: Number,
    required: false,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.USERS,
    required: true,
    unique: true,
  },
});

const Client = mongoose.model(COLLECTIONS.CLIENTS, ClientSchema);

module.exports = Client;
