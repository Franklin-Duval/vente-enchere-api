const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  localisation: {
    adresse: {
      type: String,
      required: true,
    },
    pays: {
      type: String,
      required: true,
    },
    ville: {
      type: String,
      required: true,
    },
  },
  telephone: {
    type: String,
    required: true,
  },
  pseudo: {
    type: String,
    required: false,
  },
  roles: {
    type: Array,
    required: true,
  },
  numeroCompte: {
    type: String,
    required: false,
  },
  numeroMomo: {
    type: String,
    required: false,
  },
  compte: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.COMPTES,
    required: true,
    unique: true,
  },
  dateAjout: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model(COLLECTIONS.USERS, UserSchema);

module.exports = User;
