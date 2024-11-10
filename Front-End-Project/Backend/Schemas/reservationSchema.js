const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  accommodation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodation",
    required: true
  },
  checkin: {type: String, required: true},
  checkout: {type: String, required: true}
})

module.exports = mongoose.model('Reservation', reservationSchema)