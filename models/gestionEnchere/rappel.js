const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const RappelSchema = new Schema({
  dateAjout: {
    type: Date,
    default: Date.now(),
  },
  produit: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.PRODUITS,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.USERS,
    required: true,
  },
});

const Rappel = mongoose.model(COLLECTIONS.RAPPEL, RappelSchema);

module.exports = Rappel;
