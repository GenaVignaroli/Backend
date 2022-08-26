const { CategoryModel } = require ('../models');
const { ProductsAPI} = require ('./productos');

const find = (id) => {
  if (id) return CategoryModel.findById(id);

  return CategoryModel.find();
};

const create = (newCategory) => CategoryModel.create(newCategory);

const update = (id, data) =>
  CategoryModel.findByIdAndUpdate(id, data, {
    new: true,
  });

const remove = async (id) => {
  const productsWithCategory = await ProductsAPI.findByCategory(id);

  if (productsWithCategory.length > 0)
    throw(
      'Cannot delete category because there is products with that category'
    );

  CategoryModel.findByIdAndDelete(id);
};

const CategoryAPI = {
  find,
  create,
  update,
  remove,
}

module.exports = {
  CategoryAPI: CategoryAPI,
};