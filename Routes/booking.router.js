const express = require("express");
const { BookingModel } = require("../Modals/booking.model");
const bookingRouter = express.Router();

bookingRouter.post("/", async (req, res) => {
  try {
    const booking = new BookingModel(req.body);
    await booking.save();
    res.send({ msg: "booking has been created" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});

bookingRouter.get("/dashboard", async (req, res) => {
  try {
    const bookings = await BookingModel.find();

    res.json(bookings);
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});

module.exports = { bookingRouter };
