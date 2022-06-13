const { createUser, validateUsernamePassword, getUserByEmail, generateToken, updateUserPassword } = require('../services/user.service');
const { sendEmail } = require('../services/email.service');

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
    await sendEmail({
      to: email,
      subject: "Welcome to devsnest ecommerce-app",
      text: "welcome",
      html: '<h1> Welcome! </h1>'
    })
    res.status(201).json({ msg: "Successfully Signed Up", token });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ msg: "Something Failed!"});
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try{
  if (!email) {
    res.status(400).json({ msg: 'Email is needed'});
  }

  const user = await getUserByEmail(email);
  console.log('&&&&&&&&', user);
  if (!user) {
    res.status(401).json({ msg: 'Invalid Email'});
  }

  const token = await generateToken(user.name, user.email, user.role, '10m');
  res.status(200).json({ token });
} catch (err) {
  console.log(err.stack);
  res.status(500).json({ msg: "Something Failed!"});
}
}

const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { email } = req.userDetails;
  console.log(req.userDetails);
  try{
  if (password!==confirmPassword) {
    res.status(400).json({ msg: "Passwords don't match"});
  }

  await updateUserPassword(email, password);
  res.status(200).json({ msg: 'Success'});
} catch (err) {
  console.log(err.stack);
  res.status(500).json({ msg: "Something Failed!"});
}

}

module.exports = {
  login,
  signUp,
  forgotPassword,
  resetPassword
};
