const express = require('express')
const path = require('path')
const flash = require('connect-flash'); // to flush - remove unecessary infos after end of session
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/auth");
const requireLogin = require("./middlewares/authentication");
const io = require("socket.io")

const app = express();

app.use(fileUpload())
app.use(bodyParser.json())
require('dotenv').config()
app.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie : {secure : false}
}))

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log("We're connected to the database");
});


io.on('connection', function(socket) {
  console.log('User connected');

  socket.on('location', function(location) {
    console.log('Location received:', location);
    // Store location in database
    locations.insertOne(location, function(err, res) {
      if (err) throw err;
      console.log('Location stored in database');
    });
    // Broadcast location to all connected clients
    socket.broadcast.emit('location', location);
  });

  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
});



let port = process.env.PORT;
if (port == null || port == "") {
port = 4000;
}

app.listen(port, ()=>{
console.log(`App listening on port ${process.env.PORT}`)
})

app.use("/api/v1/",authRouter);
app.get('/protected', requireLogin, (req, res) => {
  res.send(`Hello, ${req.session.userId}!`);
 });
