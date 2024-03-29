const { UserModel } = require ('../models');

const find = (id) => {
  if (id) return UserModel.findById(id);

  return UserModel.find();
};

const findByEmail = (email) => UserModel.findOne({ email });

const create = (newUser) => UserModel.create(newUser);

const update = (id, data) =>
  UserModel.findByIdAndUpdate(id, data, {
    new: true,
  });

const remove = (id) => UserModel.findByIdAndDelete(id);

const UsuarioAPI = {
  find,
  findByEmail,
  create,
  update,
  remove,
}

module.exports =  {
  UsuarioAPI: UsuarioAPI,
};