const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const ConnectionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.VENDEURS,
  },
  salleEnchere: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.SALLEENCHERE,
  },
});

const Connection = mongoose.model(COLLECTIONS.CONNECTION, ConnectionSchema);

module.exports = Connection;
