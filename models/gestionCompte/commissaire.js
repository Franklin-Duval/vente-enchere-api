const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const CommissairePriseurSchema = new Schema({
  nombreEnchereOrganisee: {
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

const CommissairePriseur = mongoose.model(
  COLLECTIONS.COMMISSAIREPRISEUR,
  CommissairePriseurSchema,
);

module.exports = CommissairePriseur;
