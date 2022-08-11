const passport = require(`passport`);
const { Strategy } = require ('passport-local');
const { UserModel } = require ('../models/usuario');
const {
  validateNewUser,
  getUserByEmail,
  createUser,
} = require ('../controllers/usuario');
const Logger = require ('./login');
const { NotificationService } = require ('./noti');

const strategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const login = async ( username, password, done) => {
  Logger.info('LOGINNN');

  const user = await getUserByEmail(username);
  if (!user) {
    return done(null, false, { message: 'Invalid Username/Password' });
  }
  const isValidPassword = await user.isValidPassword(password);

  if (!isValidPassword) {
    return done(null, false, { message: 'Invalid Username/Password' });
  }

  Logger.info('SALIO TODO BIEN');
  return done(null, user);
};

const signup = async (req, username, password, done) => {
  try {
    Logger.info('ENTRE');
    Logger.info(req.body);
    const { firstName, lastName, age, admin, address } = req.body;

    if (validateNewUser(req.body)) {
      Logger.error('Invalid body fields');
      return done(null, false, { message: 'Invalid Body Fields' });
    }

    const user = await getUserByEmail(username);

    if (user) {
      Logger.error('User already exists');
      return done(null, false, { message: 'User already exists' });
    } else {
      const userData = {
        email: username,
        password,
        firstName,
        lastName,
        age,
        admin,
        address,
      };

      const newUser = await createUser(userData);
      await NotificationService.notifyNewUserByEmail(newUser);
      return done(null, newUser);
    }
  } catch (error) {
    done(error);
  }
};

const loginFunc = new Strategy(strategyOptions, login);
const signUpFunc = new Strategy(strategyOptions, signup);

module.exports = {
    loginFunc,
    signUpFunc
}

passport.serializeUser((user, done) => {
  Logger.info('Se Ejecuta el serializeUser');
  done(null, user._id);
});


passport.deserializeUser((userId, done) => {
  console.log('HOLAAAA\n\n\n\n\n');
  Logger.info('Se Ejecuta el desserializeUser');
  UserModel.findById(userId).then((user) => {
    return done(null, user);
  });
});