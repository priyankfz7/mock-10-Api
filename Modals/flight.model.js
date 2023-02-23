const mongoose = require("mongoose");

const flightSchema = mongoose.Schema({
  userID: String,
  airline: String,
  flightNo: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  seats: Number,
  price: Number,
});

const FlightModel = mongoose.model("flight", flightSchema);
module.exports = { FlightModel };
