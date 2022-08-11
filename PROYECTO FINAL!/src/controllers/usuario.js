const Logger = require ('../services/login');
const { UserAPI, CartAPI } = require ('../api');

const validateNewUser = (newUser) => {
  return (
    !newUser ||
    !newUser.firstName ||
    !newUser.lastName ||
    !newUser.age ||
    !newUser.address ||
    !newUser.address.street ||
    !newUser.address.city
  );
};

const getUserByEmail = (email) => UserAPI.findByEmail(email);

const createUser = async (userData) => {
  const newUser = await UserAPI.create(userData);
  await CartAPI.create(newUser._id);
  return newUser;
};

const isLoggedIn = (req, res, done) => {
  Logger.info('Is Authenticated');
  Logger.info(req.isAuthenticated());
  Logger.info('req.user');
  Logger.info(req.user);
  if (!req.isAuthenticated())
    return res.status(401).json({ msg: 'Unathorized' });

  done();
};

const isAdmin = (req, res, done) => {
  Logger.info('Is Admin Middleware');
  Logger.info(req.user);

  if (!req.user.admin)
    return res.status(401).json({ msg: 'Unathorized - Admin Only' });

  done();
};

module.exports = {
    isAdmin,
    isLoggedIn,
    createUser,
    getUserByEmail,
    validateNewUser
}