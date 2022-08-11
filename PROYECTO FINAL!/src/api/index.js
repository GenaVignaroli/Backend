const CategoryAPI = require ('./categories');
const UserAPI = require ('./usuario');
const CartAPI = require ('./carrito');
const ProductsAPI = require ('./productos');
const { ErrorStatus, ApiError } = require ('./error');

module.exports = { UserAPI, CartAPI, ProductsAPI, ErrorStatus, ApiError, CategoryAPI };