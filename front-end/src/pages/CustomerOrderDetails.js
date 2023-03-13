import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { getSales } from '../api/fetchApi';
import Header from '../components/Header';

const ORDER_ID = 'customer_order_details__element-order-details-label-order-id';
const SELLER = 'customer_order_details__element-order-details-label-seller-name';
const DATE = 'customer_order_details__element-order-details-label-order-date';
const STATUS = 'customer_order_details__element-order-details-label-delivery-status-';
const TABLE_NUMBER = 'customer_order_details__element-order-table-item-number-';
const TABLE_NAME = 'customer_order_details__element-order-table-name-';
const TABLE_QTD = 'customer_order_details__element-order-table-quantity-';
const TABLE_PRICE = 'customer_order_details__element-order-table-unit-price-';
const TABLE_SUBTOTAL = 'customer_order_details__element-order-table-sub-total-';
const TOTAL_PRICE = 'customer_order_details__element-order-total-price';
const DELIVERY_CHECK = 'customer_order_details__button-delivery-check';
const TEN = 10;

export default function CustomerOrdersDetails({ history, match }) {
  const [sales, setSales] = useState([]);
  const [itensCart, setItensCart] = useState([]);

  useEffect(() => {
    const getAllSales = async () => {
      const data = await getSales();
      setSales(data.data);
      const getCartItens = JSON.parse(localStorage.getItem('cart'));
      setItensCart(getCartItens);
    };
    getAllSales();
  }, []);

  let totalPrice = 0;
  itensCart.forEach((item) => {
    totalPrice += (item.qtd * item.price);
  });

  const convertData = (saleDate) => {
    const data = new Date(saleDate);
    const dia = data.getUTCDate();
    const mes = data.getUTCMonth() + 1;
    const ano = data.getUTCFullYear();
    const result = `${dia < TEN ? `0${dia}` : dia}/${mes < TEN ? `0${mes}` : mes}/${ano}`;
    return result;
  };

  return (
    <div>
      <Header history={ history } />
      <h1>CUSTOMER ORDERS DETAILS</h1>
      {sales.length > 0
        && (
          <div>
            <p
              data-testid={ ORDER_ID }
            >
              {match.params.id}
            </p>
            <p data-testid={ SELLER }>
              Fulana Pereira
            </p>
            <p
              data-testid={ DATE }
            >
              {convertData(sales[0].saleDate)}
            </p>
            <p
              data-testid={ STATUS }
            >
              {sales[0].status}
            </p>
          </div>)}
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
        { itensCart.map((data, i) => (
          <tr key={ i }>
            <td data-testid={ `${TABLE_NUMBER}-${i}` }>
              { i + 1 }
            </td>
            <td data-testid={ `${TABLE_NAME}-${i}` }>
              { data.name}
            </td>
            <td data-testid={ `${TABLE_QTD}-${i}` }>
              { data.qtd }
            </td>
            <td data-testid={ `${TABLE_PRICE}-${i}` }>
              {`R$ ${(data.price).replaceAll('.', ',')}` }
            </td>
            <td data-testid={ `${TABLE_SUBTOTAL}-${i}` }>
              {`R$ ${(data.qtd * data.price).toFixed(2).replaceAll('.', ',')}` }
            </td>
            <button
              type="button"
              data-testid={ DELIVERY_CHECK }
              disabled
              onClick={ () => {} }
            >
              MARCAR COMO ENTREGUE
            </button>
          </tr>))}
      </table>
      <p data-testid={ TOTAL_PRICE }>
        TOTAL:
        {` R$ ${totalPrice.toFixed(2).replaceAll('.', ',')}`}
      </p>
    </div>
  );
}

CustomerOrdersDetails.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  match: propTypes.shape({
    params: propTypes.func.isRequired,
  }).isRequired,
};
