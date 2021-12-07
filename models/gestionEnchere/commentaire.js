const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const CommentaireSchema = new Schema({
  content: {
    type: String,
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

const Commentaire = mongoose.model(COLLECTIONS.COMMENTAIRE, CommentaireSchema);

module.exports = Commentaire;
