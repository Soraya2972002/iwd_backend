const User = require('../models/users.js')
const bcrypt = require('bcrypt')


const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    req.session.userId = user._id
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email : email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    req.session.userId = user._id
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

// const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user)
//       return res.json({ msg: "Incorrect Username or Password", status: false });
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid)
//       return res.json({ msg: "Incorrect Username or Password", status: false });
//     delete user.password;
//     return res.json({ status: true, user });
//   } catch (ex) {
//     next(ex);
//   }
// }

const logout = async (req, res) => {
  console.log(req.session.userId)
  id = req.session.userId
  console.log(id)
  const user = User.findOne({id : id})
  console.log(user.id)
  req.session.destroy(() =>{
    return res.status(200).send("logout");
  })
}

// // const register = async (req, res) => {
// //   User.create(req.body, (error, user) => {
// //   if(error){
// //       const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
// //       req.flash('validationErrors',validationErrors)
// //       req.flash('data',req.body)
// //       req.session.validationErrors = validationErrors
// //       return res.status(400).send("failed");
// //   }
// //   return res.status(200).send("success");
// //   })
// // }

// const register = async (req, res) =>{
//   try {
//     const { username, email, password } = req.body;
//     const usernameCheck = await User.findOne({ username });
//     if (usernameCheck)
//       return res.json({ msg: "Username already used", status: false });
//     const emailCheck = await User.findOne({ email });
//     if (emailCheck)
//       return res.json({ msg: "Email already used", status: false });
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       email,
//       username,
//       password: hashedPassword,
//     });
//     delete user.password;
//     return res.json({ status: true, user });
//   } catch (ex) {
//     next(ex);
//   }
// }

module.exports = { login, register, logout }