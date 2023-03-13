import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { getSales, updateSaleStatus } from '../api/fetchApi';
import Header from '../components/Header';

const ITEM_NUMBER = 'seller_order_details__element-order-table-item-number';
const NAME = 'seller_order_details__element-order-table-name';
const QUANTITY = 'seller_order_details__element-order-table-quantity';
const UNIT_PRICE = 'seller_order_details__element-order-table-unit-price';
const SUB_TOTAL = 'seller_order_details__element-order-table-sub-total';
const STATUS = 'seller_order_details__element-order-details-label-delivery-status';
const TEN = 10;

export default function OrderDetails({ history }) {
  const [sales, setSales] = useState([]);
  const [itensCart, setItensCart] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [isInTransit, setIsInTransit] = useState(false);

  useEffect(() => {
    const getAllSales = async () => {
      const data = await getSales();
      setSales(data.data);
      const getCartItens = JSON.parse(localStorage.getItem('cart'));
      setItensCart(getCartItens);
    };
    getAllSales();
    if (sales[0] && sales[0].status === 'Pendente') {
      setIsPending(true);
      setIsInTransit(false);
    }
    if (sales[0] && sales[0].status === 'Preparando') {
      setIsInTransit(true);
      setIsPending(false);
    }
    if (sales[0] && sales[0].status === 'Em Trânsito') {
      setIsInTransit(false);
      setIsPending(false);
    }
  }, [sales, isPending, isInTransit]);

  function converterData(saleDate) {
    const data = new Date(saleDate);
    const dia = data.getUTCDate();
    const mes = data.getUTCMonth() + 1;
    const ano = data.getUTCFullYear();
    const result = `${dia < TEN ? `0${dia}` : dia}/${mes < TEN ? `0${mes}` : mes}/${ano}`;
    return result;
  }

  let totalPrice = 0;
  itensCart.forEach((item) => {
    totalPrice += (item.qtd * item.price);
  });

  const updateStatus = async (event, saleId, SaleStatus) => {
    const e = event.target.value;

    if (e === 'Preparar' && SaleStatus === 'Pendente') {
      await updateSaleStatus(saleId, SaleStatus);
      setIsInTransit(true);
      setIsPending(false);
    }

    if (e === 'Entregar' && SaleStatus === 'Preparando') {
      await updateSaleStatus(saleId, SaleStatus);
      setIsInTransit(false);
    }
  };

  return (
    <div>
      <Header history={ history } />
      OrdersDetails
      {sales.length > 0
        && sales.map((sale, index) => (
          <div key={ index }>
            <p
              data-testid="seller_order_details__element-order-details-label-order-id"
            >
              {sale.id}
            </p>
            <p
              data-testid={ NAME }
            >
              Fulana Pereira
            </p>
            <p
              data-testid={ STATUS }
            >
              {sale.status}
            </p>
            <p
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              {converterData(sale.saleDate)}
            </p>
            <button
              data-testid="seller_order_details__button-preparing-check"
              type="button"
              value="Preparar"
              disabled={ !isPending }
              onClick={ (event) => updateStatus(event, sale.id, sale.status) }
            >
              PREPARAR PEDIDO
            </button>
            <button
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              value="Entregar"
              disabled={ !isInTransit }
              onClick={ (event) => updateStatus(event, sale.id, sale.status) }
            >
              SAIU PARA ENTREGA
            </button>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                  <th>Valor Unitário</th>
                  <th>Sub-total</th>
                </tr>
              </thead>
              <tbody>
                {itensCart.map((item, i) => (
                  <tr key={ i }>
                    <td data-testid={ `${ITEM_NUMBER}-${i}` }>{i + 1}</td>
                    <td data-testid={ `${NAME}-${i}` }>{item.name}</td>
                    <td data-testid={ `${QUANTITY}-${i}` }>{item.qtd}</td>
                    <td data-testid={ `${UNIT_PRICE}-${i}` }>{item.price}</td>
                    <td data-testid={ `${SUB_TOTAL}-${i}` }>
                      {`R$ ${(item.qtd * item.price).toFixed(2).replaceAll('.', ',')}` }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p
              data-testid="seller_order_details__element-order-total-price"
            >
              TOTAL:
              {` R$ ${totalPrice.toFixed(2).replaceAll('.', ',')}`}
            </p>
          </div>))}
    </div>
  );
}

OrderDetails.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
