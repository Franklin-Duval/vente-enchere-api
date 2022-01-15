const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const ParticipationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.USERS,
  },
  salleEnchere: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.SALLEENCHERE,
  },
  username: {
    type: String,
    required: true,
  },
  connected: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Participation = mongoose.model(
  COLLECTIONS.PARTICIPATION,
  ParticipationSchema,
);

module.exports = Participation;
