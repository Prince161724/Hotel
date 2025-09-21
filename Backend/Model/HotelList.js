const mongoose = require('mongoose');

const HotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: [String],       // array of 2 elements
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  occupancy: {
    type: String,         // example: "solo", "couple", "family"
    required: true
  },
  pets: {
    type: String,         // "yes" / "no"
    required: true
  },
  propertyType: {
    type: String,         // example: "apartment", "villa"
    required: true
  },
  comfort: {
    type: [String],       // array of comfort features
    default: []
  },
  environment: {
    type: [String],       // array of environment features
    default: []
  },
  rules: {
    type: [String],       // array of rules
    default: []
  },
  cancellation: {
    type: String,         // "yes" / "no"
    required: true
  },
  booking: {
    type: String,         // "instant" or other types
    required: true
  },
  Booked:{
    type:String,
    default:"no"
  }
});

const Hotelnames = mongoose.model("hotelnames", HotelSchema);
module.exports = Hotelnames;
