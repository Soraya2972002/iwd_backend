const express = require('express')
const path = require('path')
const flash = require('connect-flash'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/auth");
const serviceRouter = require("./routes/services");
const jobsRouter = require("./routes/jobs");
const requireLogin = require("./middlewares/authentication");
const app = express();

app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config()
app.use(express.static('public'))
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



let port = process.env.PORT;
if (port == null || port == "") {
port = 4000;
}

app.listen(port, ()=>{
console.log(`App listening on port ${process.env.PORT}`)
})

app.use("/api/v1/",authRouter);
app.use("/api/v1/",serviceRouter);
app.use("/api/v1/",jobsRouter);

app.get('/protected', requireLogin, (req, res) => {
  res.send(`Hello, ${req.session.userId}!`);
 });
