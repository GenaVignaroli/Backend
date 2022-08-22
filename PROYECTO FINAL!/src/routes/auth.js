const passport = require("passport");
const express = require ("express");
const {isLoggedIn} = require("../config/isAdmin");
const UserRouter = require(`./usuario`)
const {CartAPI} = require(`../api/carrito`)

const router = express.Router();

const passportOptions = { badRequestMessage: 'Falta username / password' };
router.post(
  '/login',
  passport.authenticate('login', passportOptions),
  function (req, res) {
    const { user } = req;
    const cart = CartAPI.create(user._id);
    res.json({ msg: `Bienvenido ${req.user.username}`, user: req.user });
  },
);


router.post('/signup', (req, res, next) => {
  passport.authenticate('signup', passportOptions, (err, user, info) => {
    console.log('Info SIGNUP');
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json({ data: info });

    res.json({ msg: 'signup OK' });
  })(req, res, next);
});
  
  router.use('/user', isLoggedIn, UserRouter);

module.exports = router;