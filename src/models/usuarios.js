const mongoose = require('mongoose');

const usuariosCollectionName = 'usuarios';

const usuariosSchema = new mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId},
        nombre: { type: String, required: true },
        password: { type: String, required: true },
      },
  { timestamps: true, versionKey: false }
);

 const UsuariosModel = mongoose.model(
    usuariosCollectionName,
    usuariosSchema
);

module.exports = {UsuariosModel}