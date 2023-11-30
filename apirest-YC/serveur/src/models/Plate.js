const mongoose = require('mongoose');

const UserSchema = require('./User');

const PlateSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
}, {
  timestamps: true 
});

PlateSchema.methods.getPublicData = function() {
  return {
    id: this._id,
    name: this.name,
    image: this.image,
    price: this.price,
    userId: this.userId
  };
};

module.exports = mongoose.model('Plate', PlateSchema);
