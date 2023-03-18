const {User, Comment} = require('../models/users.js')
const bcrypt = require('bcrypt')
const path = require("path");

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) { 
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


const login = async (req, res, next) => { // user login
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
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



const register = async (req, res, next) => { //user register
  try {
    const { nom, prenom, email, password, phone_number, bio, services, interestedTheme, baridimob, reviews, latitude, longtitude} = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      let image = req.files.picture;
      let identity_picture = req.files.identity_picture;
      console.log(image)
      image.mv(path.join(__dirname, 'imgUsers/') + image.name)
      identity_picture.mv(path.join(__dirname, 'imgUsersIdentity/') + identity_picture.name)
      const user = await User.create({
        email,
        nom,
        prenom,
        password: hashedPassword,
        phone_number,
        bio, 
        services, 
        interestedTheme, 
        reviews,
        picture : 'imgUsers/' + image.name,
        identity_picture : "imgUsersIdentity/" + identity_picture.name,
        latitude, 
        longtitude,
        baridimob
      });
      delete user.password;
      req.session.userId = user._id
      return res.json({ status: true, user });}
    catch {
      let identity_picture = req.files.identity_picture;
      identity_picture.mv(path.join(__dirname, 'imgUsersIdentity/') + identity_picture.name)
      const user = await User.create({
        email,
        nom,
        prenom,
        password: hashedPassword,
        phone_number,
        bio, 
        services, 
        interestedTheme, 
        identity_picture : "imgUsersIdentity/" + identity_picture.name,
        reviews,
        latitude, 
        longtitude,
        baridimob
      });
      delete user.password;
      req.session.userId = user._id
      return res.json({ status: true, user });
    }
  } catch (ex) {
    next(ex);
  }
};


const logout = async (req, res) => { //user logout
  console.log(req.session.userId)
  id = req.session.userId
  console.log(id)
  const user = User.findById({id : id})
  console.log(user.id)
  req.session.destroy(() =>{
    return res.status(200).send("logout");
  })
}

const displayAllUsers = async (req,res)=>{ //to get all users
  try{
  const data = await User.find();
  res.status(200).json({ data: data })
  }
  catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
}

const getFilteredUsers = async (req, res) => {  // to filter users, according to any query
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

const updateUserphone = async (req, res) => { // to update the phone number of the user
  try {
    const { id, new_phone } = req.body;
    const user = await User.findById({ id:id });
    user.phone_number = new_phone
    user.save()
    res.status(200).json({ user: user })
  }
  catch (err){
    res.status(400).json({ data: data })
  }
}

const writeReview = async (req, res) => { // to write a review about the work of a freelancer - you write a text and also get to add a rating
  try {
    const { id_of_other_person, rating, text, author } = req.body;
    const review = await Comment.create({
      rating: rating, 
      text : text, 
      author : author,
    });
    const user = await User.findById(id_of_other_person);
    user.reviews = user.reviews.unshift(review)
    res.status(200).json({ user: user })}
  catch (err){
    console.log(err)
    res.status(400).json({ err: err })
  }
}

const getGlobalReview = async (req, res) => { // to get the average rating of a user
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    sum = 0
    i = 0
    for (let review in user.reviews) {
      console.log(review)
      sum += user.reviews[review].rating
      i += 1
    }
    if (i != 0){
      sum = sum/i
    }
    return res.status(200).json({ globalReview: sum })}
  catch (err){
    console.log(err)
    return res.status(400).json({ err: err })
  }
}

const DisplayAllReviews = async (req, res) => { //to display all reviews of a certain user
  try {
    const { id } = req.body;
    const reviews = await User.findById(id).reviews;
    return res.status(200).json({ reviews: reviews })}
  catch (err){
    console.log(err)
    return res.status(400).json({ err: err })
  }
}

const ClosestPeopleToYou = async (req, res) => { //to find the people close to you using their gps coordonates, this is in order to get an accurate result when searching for people after posting an announce
  try {
    let { id, maxDistance } = req.body;
    if (!maxDistance){
      maxDistance = 20
    }
    const current_user = await User.findById(id)
    lat1 = current_user.latitude
    long1 = current_user.longtitude
    const users = await User.find()
    const result = []
    for (let user in users) {
      console.log(lat1, long1, users[user].latitude, users[user].longtitude)
      distance = getDistanceFromLatLonInKm(lat1, long1, users[user].latitude, users[user].longtitude)
      if (distance <= maxDistance) {
        result.push(users[user])
      }
    }
    return res.status(200).json({ usersInCircle: result })
  } catch (err) {
    console.log(err)
    return res.status(401).json({ err: err })
  }
}

const getNumBids = async (req, res) => { // get the number of bids of a certain user - these are virtual points used inside of the app
  try {
    let { id } = req.body;
    const user = await User.findById(id)
    const bids = user.bids;
    return res.status(200).json({ bids: bids })
  } catch (err) {
    console.log(err)
    return res.status(401).json({ err: err })
  }
}

const updateBids = async (req, res) => { //update the bids - when a user gets a job, the bids decrease, and they increase once a month or when buying them
  try {
    let { id, amount_to_add } = req.body;
    const user = await User.findById(id);
    user.bids = user.bids + amount_to_add
    user.save()
    return res.status(200).json({ user: user })
  } catch (err) {
    console.log(err)
    return res.status(401).json({ err: err })
  }
}




module.exports = { login, register, logout, displayAllUsers, getFilteredUsers, updateUserphone, writeReview, getGlobalReview, DisplayAllReviews, ClosestPeopleToYou, getNumBids, updateBids }