const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['ADMIN', 'USER', 'RESTAURANT'], 
    required: true, 
    default: 'USER' 
  },
  address: { 
    type: String 
  },
  postalCode: { 
    type: String 
  },
  city: { 
    type: String 
  }
}, { 
  timestamps: true 
});

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', UserSchema);
