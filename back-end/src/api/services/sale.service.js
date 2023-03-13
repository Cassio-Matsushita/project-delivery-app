const { Sale } = require('../../database/models');

const getSales = async () => {
  const sales = await Sale.findAll();
  return sales;
};

const insertSales = async (sale) => {
  const sales = await Sale.create({ 
    userId: sale.userId,
    sellerId: sale.sellerId,
    totalPrice: sale.totalPrice,
    deliveryAddress: sale.deliveryAddress,
    deliveryNumber: sale.deliveryNumber,
    saleDate: sale.saleDate,
    status: sale.status,
  });
  return sales;
};

const updateSaleStatus = async (saleId, saleStatus) => {
  if (saleStatus === 'Pendente') { 
    const sale = await Sale.update(
      { status: 'Preparando' },
      { where: { id: saleId } },
      );
    return sale;
  }

  if (saleStatus === 'Preparando') {
    const sale = await Sale.update(
      { status: 'Em Trânsito' },
      { where: { id: saleId } },
    );
    return sale;
  }
};

module.exports = {
  getSales,
  insertSales,
  updateSaleStatus,
};
