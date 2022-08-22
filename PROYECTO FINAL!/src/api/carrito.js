const { CartModel } = require ('../models');
const { NotificationService }  = require ('../services/noti');
const { ProductsAPI,  } = require ('./productos');

const create = (userId) => CartModel.create({ userId });

const getCardByUser = (userId) => CartModel.findOne({ userId });

const addProduct = async (cartId, productId, items) => {
  const product = await ProductsAPI.find(productId);

  if (!product)
    throw ('No existe el producto');

  const cart = await CartModel.findById(cartId);
  console.log(cart)
  if (!cart) throw ('Carrito inexistente');

  const index = cart.products.findIndex(
    (aProduct) => aProduct.productId == productId,
  );

  if (index < 0) {
    const newProductItem = {
      productId: productId,
      items: Number(items),
    };
    cart.products.push(newProductItem);
  } else cart.products[index].items += items;

  await cart.save();

  await ProductsAPI.removeStock(productId, items);

  return cart;
};

const deleteProducts = async (cartId, productId, items) => {
  const product = await ProductsAPI.find(productId);

  if (!product)
    throw ('No hay productos para borrar!');

  const cart = await CartModel.findById(cartId);

  if (!cart) ('No existe un carrito!');

  const index = cart.products.findIndex(
    (aProduct) => aProduct.productId == productId,
  );

  if (index < 0)
    throw ('No hay productos!');

  if (!items || cart.products[index].items <= items) {
    await ProductsAPI.addStock(productId, cart.products[index].items);
    cart.products.splice(index, 1);
  } else {
    await ProductsAPI.addStock(productId, items);
    cart.products[index].items -= items;
  }

  await cart.save();

  return cart;
};

const emptyCart = async (cartId) => {
  const cart = await CartModel.findById(cartId);

  if (!cart) ('No existe un carrito!');

  cart.products = [];
  await cart.save();

  return cart;
};

const createOrder = async (cartId) => {
  const cart = await CartModel.findById(cartId);
  console.log(cart)
  if (!cart) throw ('No existe un carrito!')
  if (!cart.products.length)
    throw (
      'No se puede crear una orden si no hay productos en el carrito!');

  await NotificationService.notifyNewOrderUsingWhatsApp(cart);

  await emptyCart(cartId);
};

const CartAPI = {
  create,
  addProduct,
  deleteProducts,
  getCardByUser,
  emptyCart,
  createOrder,
}

module.exports = {
  CartAPI: CartAPI,
};