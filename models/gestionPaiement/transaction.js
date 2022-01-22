const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  montant: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['retrait', 'envoi', 'paiement'],
  },
  wallet: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.WALLET,
    required: true,
  },
});

const Transaction = mongoose.model(COLLECTIONS.TRANSACTION, TransactionSchema);

module.exports = Transaction;
