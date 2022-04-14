const express = require('express');

const recordRouter = require('./record');
const userAuthController = require('../controllers/userAuthController');

const router = express.Router();


router.use('/me/records', recordRouter);

router.post("/register", userAuthController.regiterUser);
router.post("/login", userAuthController.loginUser);
router.delete('/logout', userAuthController.logoutUser)

router.get("/me", (req, res) => {
  res.send(req.user); 
});


module.exports = router;