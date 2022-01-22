const mongoose = require('mongoose');
const COLLECTIONS = require('../../database/collections');

const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.USERS,
    required: true,
    unique: true,
  },
});

const Wallet = mongoose.model(COLLECTIONS.WALLET, WalletSchema);

module.exports = Wallet;
