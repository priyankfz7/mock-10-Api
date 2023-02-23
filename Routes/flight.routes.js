const e = require("express");
const express = require("express");
const { FlightModel } = require("../Modals/flight.model");

const flightRouter = express.Router();

flightRouter.get("/", async (req, res) => {
  const userID = req.body.userID;
  try {
    const flights = await FlightModel.find({ userID });
    res.json(flights);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went Wrong" });
  }
});

flightRouter.get("/:id", async (req, res) => {
  const userID = req.body.userID;
  const _id = req.params.id;
  try {
    const flights = await FlightModel.findOne({ _id, userID });
    res.json(flights);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went Wrong" });
  }
});

flightRouter.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const flight = new FlightModel(req.body);
    await flight.save();
    res.send({ msg: "flight has been created" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});

flightRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  console.log(req.body);
  try {
    const flight = await FlightModel.findById(id);
    if (flight.userID == userID) {
      await FlightModel.findByIdAndDelete(id);
      res.send({ msg: "flight has baan deleted" });
    } else {
      res.status(401);
      res.send({ msg: "User not matched" });
    }
  } catch (err) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});

flightRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  const data = req.body;
  try {
    const flight = await FlightModel.findById(id);
    if (flight.userID == userID) {
      await FlightModel.findByIdAndUpdate(id, { ...data });
      res.send({ msg: "Flight has baan updated" });
    } else {
      res.status(401);
      res.send({ msg: "User not matched" });
    }
  } catch (err) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});

flightRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  const data = req.body;
  try {
    const flight = await FlightModel.findById(id);
    if (flight.userID == userID) {
      await FlightModel.findOneAndReplace(id, { ...data });
      res.send({ msg: "Flight has baan replaced" });
    } else {
      res.status(401);
      res.send({ msg: "User not matched" });
    }
  } catch (err) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});
module.exports = { flightRouter };
