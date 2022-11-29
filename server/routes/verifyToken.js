// import jwt
const jwt = require("jsonwebtoken");
// import secret key
require("dotenv").config();
const key = process.env.KEY;
// console.log(key)

module.exports = function (req, res, next) {
  // get the token from the req header if no token, respond err
  const token = req.header("token");
  if (!token) return res.status(401).send("Access denied.");

  try {
    // verify the token, attach the verified user credidentials to req user
    const verifiedToken = jwt.verify(token, key);
    req.customer = verifiedToken;
    next();
  } 
  catch (error) {
    res.status(404).send({message:"Access denied.", error});
  }
};
