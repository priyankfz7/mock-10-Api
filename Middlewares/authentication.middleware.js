const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.authentication;
  jwt.verify(token, "priyank", (err, decoded) => {
    if (err) {
      res.status(401);
      res.send({ msg: "login required" });
    } else {
      req.body.userID = decoded.userID;
      next();
    }
  });
};

module.exports = { authentication };
