const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  user: Object,
  flight: Object,
});

const BookingModel = mongoose.model("booking", bookingSchema);
module.exports = { BookingModel };
