const mongoose = require("mongoose");

const UserSchema = require('./User');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  status: {
    type: String,
    enum: ['PROCESSED', 'CANCELED'],
    default: 'PROCESSED',
    required: true
  }
}, {
  timestamps: true 
});

OrderSchema.methods.toJSON = function () {
  const order = this.toObject();
  delete order.__v; 
  return order;
};

module.exports = mongoose.model("Order", OrderSchema);
