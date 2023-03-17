const User = require('../models/users.js')
const bcrypt = require('bcrypt')
const path = require("path");


const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!password) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid)
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
    const { username, email, password, phone_number, bio, services, interestedTheme, skills, reviews, latitude, longtitude} = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email : email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      let image = req.files.picture;
      console.log(image)
      image.mv(path.join(__dirname, 'imgUsers/') + image.name)
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
        phone_number,
        bio, 
        services, 
        interestedTheme, 
        skills, 
        reviews,
        picture : 'imgUsers/' + image.name,
        latitude, 
        longtitude
      });
      delete user.password;
      req.session.userId = user._id
      return res.json({ status: true, user });}
    catch {
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
        phone_number,
        bio, 
        services, 
        interestedTheme, 
        skills, 
        reviews,
        latitude, 
        longtitude
      });
      delete user.password;
      req.session.userId = user._id
      return res.json({ status: true, user });
    }
  } catch (ex) {
    next(ex);
  }
};


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

const displayAllUsers = async (req,res)=>{
  try{
  const data = await User.find();
  res.status(200).json({ data: data })
  }
  catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
}

const getFilteredUsers = async (req, res) => {
  const filters = req.query;
  const data = await User.find();
  const filteredusers= data.filter(user => {
    let isValid = true;
    for (key in filters) {
      console.log(key, user[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredusers);
}

const updateUserphone = async (req, res) => {
  try 
  {const { id, new_phone } = req.body;
  const user = await User.findOne({ id:id });
  user.phone_number = new_phone
  user.save()
  res.status(200).json({ user: user })}
  catch (err){
    res.status(400).json({ data: data })
  }
}

const writeReview = async (req, res) => {
  try 
  {const { id_of_other_person, rating, text, id_of_current_person } = req.body;
  console.log(id_of_other_person)
  const users = await User.find();
  console.log(users)
  const user = ""
  for (let user in users) {
    console.log(users[user])
    console.log(users[user]._id, '    ', id_of_other_person)
    if (users[user]._id == new ObjectId(id_of_other_person)){
      break
    }
  }
  console.log(user)
  console.log(rating)
  console.log(typeof(rating))
  user.reviews = user.reviews.unshift({rating:rating, text : text, author : id_of_current_person})
  user.save()
  res.status(200).json({ user: user })}
  catch (err){
    console.log(err)
    res.status(400).json({ err: err })
  }
}



module.exports = { login, register, logout, displayAllUsers, getFilteredUsers, updateUserphone, writeReview }