const mongoose = require ('mongoose');
const { categoryCollectionName } = require ('./categories');

const productsCollectionName = 'product';

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);

const ProductModel = mongoose.model(
  productsCollectionName,
  productsSchema,
);

module.exports = {
  ProductModel,
  productsCollectionName
}