const passport = require ('passport');
const { Router } = require ('express');
const Logger = require ('../services/login');
//const { EmailService } = require ('../services/notifications');

const passportOptions = { badRequestMessage: 'Invalid username / password' };

const signUp = (req, res, next) => {
  passport.authenticate('signup', passportOptions, (err, user, info) => {
    Logger.info('Info SIGNUP');
    Logger.info(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json({ data: info });

    res.json({ msg: 'signup OK', user });
  })(req, res, next);
};

const login = (req, res, next) => {
  passport.authenticate('login', passportOptions, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json({ data: info });
    req.logIn(user, function () {
      return res.json({ msg: 'login OK', user });
    });
  })(req, res, next);
};

const router = Router();

router.post('/login', login);
router.post('/signup', signUp);
router.post('logout', (req, res) => {
  req.logOut();
  res.json({ message: 'GoodBye!' });
});

module.exports = router;