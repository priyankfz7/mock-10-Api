const express = require("express");
const { userModel } = require("../Modals/user.model");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  const data = req.body;
  const user = new userModel({ ...data });
  try {
    user.save();
    res.send({ msg: "Registration Successfull" });
  } catch (e) {
    console.log(e);
    res.status(401);
    res.send({ msg: "Something went wrong" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await userModel.find({ email });

  if (users.length > 0) {
    if (password == users[0].password) {
      const token = jwt.sign({ userID: users[0]._id }, "priyank");
      res.status(201);
      res.send({ msg: "Login Successfull", token: token });
    } else {
      res.status(401);
      res.send({ msg: "Wrong Password" });
    }
  } else {
    res.status(401);
    res.send({ msg: "Wrong Creds" });
  }
});
module.exports = { userRouter };
