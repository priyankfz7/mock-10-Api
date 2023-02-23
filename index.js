const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/db");
const { userRouter } = require("./Routes/user.routes");
const { authentication } = require("./Middlewares/authentication.middleware");
const { flightRouter } = require("./Routes/flight.routes");
const { bookingRouter } = require("./Routes/booking.router");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Flight Booking Backend");
});
app.use("/user", userRouter);
app.use(authentication);
app.use("/flights", flightRouter);
app.use("/bookings", bookingRouter);

app.listen(8080, async () => {
  try {
    connection;
    console.log("connected to db");
  } catch (e) {
    console.log(e);
  }
  console.log("Server is running at http://localhost:8080");
});
