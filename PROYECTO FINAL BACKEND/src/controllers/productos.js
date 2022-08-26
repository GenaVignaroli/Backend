const { ProductsAPI } = require ('../api/productos');

const getAllProducts = async (req,res) => {
  const products = await ProductsAPI.find();
  res.json({
    data: products,
  });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsAPI.find(id);

  if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });

  res.json({
    data: product,
  });
};

const createProduct = async (req, res) => {
  const { name, description, stock, price } = req.body;

  if (!name || !description || !stock || !price )
    return res.status(400).json({ msg: 'Faltan datos' });

  const newProduct = {
    name,
    description,
    stock,
    price,
  };

  const product = await ProductsAPI.create(newProduct);

  res.json({
    msg: 'Producto creado',
    data: product,
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, stock, price } = req.body;

  if (!name && !description && !stock && !price )
    return res.status(400).json({ msg: 'Faltan datos' });

  const newData = {
    name,
    description,
    stock,
    price,
  };

  const productUpdated = await ProductsAPI.update(id, newData);

  res.json({
    msg: 'Producto actualizado',
    data: productUpdated,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await ProductsAPI.find(id);

  if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });

  await ProductsAPI.remove(id);

  res.json({
    msg: 'Producto borrado',
  });
};

 module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};