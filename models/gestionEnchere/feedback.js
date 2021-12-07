const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const FeedBackSchema = new Schema({
  commentaire: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  lot: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.LOTS,
    required: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.CLIENTS,
    required: true,
  },
});

const Feedback = mongoose.model(COLLECTIONS.FEEDBACKS, FeedBackSchema);

module.exports = Feedback;
