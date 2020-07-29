const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const laundryPickupSchema = new Schema({
  pickupDate: Date,
  //type: Schema.Types.ObjectId hace referencia al modelo de usuarios
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  launderer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

laundryPickupSchema.set('timestamps', true);

const LaundryPickup = mongoose.model('LaundryPickup', laundryPickupSchema);

module.exports = LaundryPickup;