const { createUser } = require('../services/user.service');

const login = () => {

}

const signUp = async (req, res) => {
  const {
    name, email, password, confirmPassword, phoneNumber,
    dob
  } = req.body;

  // name, email, password, confirmPassword
  // and phone number are present
  if (!(name && email && password && confirmPassword
      && phoneNumber)) {
    res.status(400).json({ msg: "Insufficient Information"})
  }
  // password and confirm password are same
  if (password!==confirmPassword) {
    res.status(400).json({ msg: "Passwords don't match"});
  }

  try {
    await createUser({name, email, password,
    phoneNumber, dob});
    res.status(201).json({ msg: "Successfully Signed Up"});
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ msg: "Something Failed!"});
  }
};

module.exports = {
  login,
  signUp
};
