const productService = require('../services/product.service');

const getProducts = async (_req, res) => {
  const result = await productService.getProducts();

  if (result.message) return res.status(404).json(result.message);

  return res.status(200).json(result);
};

module.exports = { getProducts };