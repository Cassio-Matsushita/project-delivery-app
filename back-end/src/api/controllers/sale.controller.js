const saleService = require('../services/sale.service');

const getSales = async (_req, res) => {
  const result = await saleService.getSales();

  if (result.message) return res.status(404).json(result.message);
  return res.status(200).json(result);
};

const createSales = async (req, res) => {
  const result = await saleService.insertSales(req.body);

  if (!result) return res.status(500).json('Failed to create sale');
  return res.status(201).json(result);
};

const updateSaleStatus = async (req, res) => {
  const { saleId, saleStatus } = req.body;
  const result = await saleService.updateSaleStatus(saleId, saleStatus);
  if (!result) return res.status(404).send('Not Found');
  return res.status(200).json(result);
};

module.exports = { getSales, createSales, updateSaleStatus };