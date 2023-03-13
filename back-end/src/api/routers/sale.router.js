const express = require('express');

const middlewares = require('../middlewares/validateSale');
const saleController = require('../controllers/sale.controller');

const router = express.Router();

router.get('/sales', saleController.getSales);
router.post('/sales', middlewares.validateSale, saleController.createSales);
router.put('/sales', saleController.updateSaleStatus);

module.exports = router;