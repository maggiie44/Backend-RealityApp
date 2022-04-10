require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bodyParser = require('body-parser');

const userRouter = require('./routes/user');

const app = express();

// MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
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
require("./passports/passportConfig")(passport);


app.use('/users', userRouter);

const boot = async () => {
    // Connect to MongoDB 
    const URI = 'mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.PASSWORD + '@' + process.env.PROJECT_NAME + '.mongodb.net/the_reality?retryWrites=true&w=majority'
    // console.log(URI);
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    // Start express server
    app.listen(4000, () => {
        console.log('Server is running');
    }); 
};

boot();