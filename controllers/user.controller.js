const { createUser, validateUsernamePassword } = require('../services/user.service');

const login =async (req, res) => {
  const { email, password } = req.body

  if (!(email && password)) {
    res.status(400).json({ msg: "Invalid username/password"});
  }
  try {
    const {resp, token } = await validateUsernamePassword(email, password);
    if (resp) {
      res.status(200).json({ msg: 'Login Successful', token });
    } else {
      res.status(401).json({ msg: 'Access Denied'});
    }
  } catch (err) {
    console.log(err.stack)
    res.status(500).json({ msg: 'Something failed'});
  }
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
    const token = await createUser({name, email, password,
    phoneNumber, dob});
    res.status(201).json({ msg: "Successfully Signed Up", token });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ msg: "Something Failed!"});
  }
};

module.exports = {
  login,
  signUp
};
