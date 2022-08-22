const { CartAPI } = require ('../api/carrito');

const getCart = async (req, res) => {
  const { user } = req;
  const cart = await CartAPI.getCardByUser(user._id);

  res.json({
    data: cart,
  });
};

const addProduct = async (req, res) => {
  const { user } = req;
  const { productId, amount } = req.body;

  if (!productId || !amount)
    throw ('Falta producto');

  const cart = await CartAPI.getCardByUser(user._id);

  const result = await CartAPI.addProduct(cart, productId, amount);

  res.json({ msg: 'Producto agregado', data: result });
};

const deleteProduct = async (req, res) => {
  const { user } = req;
  const { productId, amount } = req.body;

  if (!productId)
    throw ('Faltan datos!');

  const cart = await CartAPI.getCardByUser(user._id);

  const result = await CartAPI.deleteProducts(cart._id, productId, amount);

  res.json({ msg: 'Producto borrado', data: result });
};

const createOrder = async (req, res) => {
  const { user } = req;
  const cart = await CartAPI.getCardByUser(user._id);

  await CartAPI.createOrder(cart);

  res.json({
    msg: 'Orden creada',
  });
};

module.exports = {
  getCart,
  addProduct,
  deleteProduct,
  createOrder,
};