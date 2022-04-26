require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const userRouter = require('../src/routes/user');

const app = express();
app.set("trust proxy", 1);

if (true) {
  app.use(async (req, res, next) => {
  const URI = 'mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.PASSWORD + '@' + process.env.PROJECT_NAME + '.mongodb.net/' + process.env.DATABASE_NAME + '?retryWrites=true&w=majority'
  await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  return next();
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("../src/passports/passportConfig")(passport);


app.use('/users', userRouter);
module.exports = app;