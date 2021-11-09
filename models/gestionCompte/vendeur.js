const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const VendeurSchema = new Schema({
  accreditation: {
    type: Boolean,
    required: true,
    default: false,
  },
  numeroCNI: {
    type: String,
    required: true,
  },
  specialite: {
    type: String,
    required: true,
  },
  chiffreAffaire: {
    type: Number,
    required: false,
    default: 0,
  },
  nombreLotsVendu: {
    type: Number,
    required: false,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.USERS,
  },
  gerant: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.GERANTS,
  },
});

const Vendeur = mongoose.model(COLLECTIONS.VENDEURS, VendeurSchema);

module.exports = Vendeur;
