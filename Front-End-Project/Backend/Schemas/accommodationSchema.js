const mongoose = require('mongoose');


const accommodationSchema = mongoose.Schema({
    
  title:          { type: String, required: true },
  host:           { type: String, required: true },
  location:       { type: String, required: true },
  description:    { type: String, required: true },
  price:          { type: Number, required: true },
  imageUrl:       { type: String, required: true },
  images:         [ String ]
})

module.exports = mongoose.model('Accommodation', accommodationSchema)