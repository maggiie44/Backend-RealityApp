const express = require('express');
const bcrypt = require('bcrypt');
const passport = require("passport");
const cors = require('cors');

const recordRouter = require('./record');
const UserModel = require('../models/userModel');
const { session } = require('passport');

const router = express.Router();

router.use('/me/records', recordRouter)

router.post("/register", (req, res) => {
  UserModel.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new UserModel({
        username: req.body.username,
        password: hashedPassword,
        records:[]
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});
router.get("/user", (req, res) => {
  // console.log(req.session)
  // console.log(req.user.id)
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
router.get('/logout', (req, res) => {
  console.log(req.session);
  req.session.destroy();
  console.log(req.session);
})


module.exports = router;