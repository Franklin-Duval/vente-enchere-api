const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const RappelSchema = new Schema({
  dateAjout: {
    type: Date,
    required: true,
  },
  salleEnchere: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.SALLEENCHERE,
    required: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.CLIENTS,
    required: true,
  },
});

const Rappel = mongoose.model(COLLECTIONS.RAPPEL, RappelSchema);

module.exports = Rappel;
