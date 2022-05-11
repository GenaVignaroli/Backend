const mongoose = require('mongoose');

const productosCollectionName = 'productos';

const productosSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId},
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

 const ProductosModel = mongoose.model(
  productosCollectionName,
  productosSchema
);

module.exports = {ProductosModel}