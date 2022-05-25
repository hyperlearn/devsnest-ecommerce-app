const jwt = require("jsonwebtoken");
const { authSecret } = require('../config');

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // Bearer dfsjgndesjk.ghndskfjhgkdjsfnhkjdsfnhgkjdsfnhgkjdfhngkjdfsg
  console.log(token);
  if (!token) return res.status(401).json({ msg: 'Unauthorized'});

  try {
    const { name, email, role } = jwt.verify(token, authSecret);
    req.userDetails = {name, email, role};
    next();
  } catch (error) {
    console.log(error.stack);
    res.status(401).json({ msg: 'Unauthorized'});
  }
}

module.exports = { authenticate };