const mongoose = require('mongoose');

const productosCollectionName = 'carritos';

const productosSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId},
    productos: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

 const ProductosModel = mongoose.model(
  productosCollectionName,
  productosSchema
);

module.exports = {ProductosModel}