const passport = require("passport");
const express = require ("express");
const {isLoggedIn} = require("../middleware/isAdmin");
const UserRouter = require(`./user`)

const router = express.Router();

const passportOptions = { badRequestMessage: 'Falta username / password' };
router.post(
  '/login',
  passport.authenticate('login', passportOptions),
  function (req, res) {
    res.json({ msg: 'Welcome!', user: req.user });
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

router.get('/hola', (req, res) => {
    res.json({ msg: 'HOLA', session: req.session });
  });
  
  router.use('/user', isLoggedIn, UserRouter);

module.exports = router;