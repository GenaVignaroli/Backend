const passport = require("passport");
const {Strategy} = require("passport-local");
const {UserModel} = require("../models/user");
const { NotificationService } = require("./notificacion")

const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  };

const login = async (req, username, password, done) => {
console.log("LOGINNN")
const user = await UserModel.findOne({ username });

if (!user || !user.isValidPassword(password)) {
    return done(null, false, { message: 'Invalid Username/Password' });
}
console.log('SALIO TODO BIEN');
return done(null, user);
};

const signup = async (req, username, password, done) => {
    try {
      console.log("ENTRE")
      const { username, password, email, firstName, lastName } = req.body;
      console.log(req.body);
      if ( !email || !firstName || !lastName) {
        console.log('Invalid body fields');
        return done(null, false, {message: 'Invalid Body Fields'});
      }
  
      const query = {
        $or: [{ username: username }, { email: email }],
      };
  
      console.log(query);
      const user = await UserModel.findOne(query);
  
      if (user) {
        console.log('User already exists');
        console.log(user);
        return done(null, false, {message: 'User already exists'});
      } else {
        const userData = {
          username,
          password,
          email,
          firstName,
          lastName,
        };
  
        const newUser = await UserModel.create(userData);
        await NotificationService.notifyNewUserByEmail(newUser);
        return done(null, newUser);
      }
    } catch (error) {
      done(error);
    }
  };

const loginFunc = new Strategy(strategyOptions, login);
const signUpFunc = new Strategy(strategyOptions, signup);

passport.serializeUser((user, done) => {
    console.log('Se Ejecuta el serializeUser');
    done(null, user._id);
  });

  passport.deserializeUser((userId, done) => {
    console.log('Se Ejecuta el desserializeUser');

    UserModel.findById(userId).then((user) => {
      return done(null, user);
    })
  });

module.exports = {
    loginFunc,
    signUpFunc
}