import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import Header from '../components/Header';
import { createSale } from '../api/fetchApi';

const ITEM_NUMBER = 'customer_checkout__element-order-table-item-number';
const NAME = 'customer_checkout__element-order-table-name';
const QUANTITY = 'customer_checkout__element-order-table-quantity';
const UNIT_PRICE = 'customer_checkout__element-order-table-unit-price';
const SUB_TOTAL = 'customer_checkout__element-order-table-sub-total';
const REMOVE = 'customer_checkout__element-order-table-remove';
const TOTAL_PRICE = 'customer_checkout__element-order-total-price';
const SELECT_SELLER = 'customer_checkout__select-seller';
const ADRESS = 'customer_checkout__input-address';
const ADRESS_NUMBER = 'customer_checkout__input-address-number';
const SUBMIT_ORDER = 'customer_checkout__button-submit-order';

function Checkout({ history }) {
  const [itensCart, setItensCart] = useState([]);
  const [deliveryAddress, setAdress] = useState('');
  const [deliveryNumber, setNumber] = useState('');

  const removeProduct = (name) => {
    const newItensList = itensCart.filter((item) => item.name !== name);
    setItensCart(newItensList);
    localStorage.setItem('cart', JSON.stringify(newItensList));
  };

  useEffect(() => {
    const getCartItens = JSON.parse(localStorage.getItem('cart'));
    setItensCart(getCartItens);
  }, []);

  let totalPrice = 0;
  itensCart.forEach((item) => {
    totalPrice += (item.qtd * item.price);
  });

  const handleClick = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const saleDate = Date.now();

    const sale = {
      userId: 3, // id estático
      sellerId: 2, // id estático
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
    };

    const { data } = await createSale(sale, token);
    history.push(`/customer/orders/${data.id}`);
  };

  return (
    <div>
      <Header />
      <div>
        <h3>Finalizar pedido</h3>
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
              <td data-testid={ `${ITEM_NUMBER}-${i}` }>
                { i + 1 }
              </td>
              <td data-testid={ `${NAME}-${i}` }>
                { data.name}
              </td>
              <td data-testid={ `${QUANTITY}-${i}` }>
                { data.qtd }
              </td>
              <td data-testid={ `${UNIT_PRICE}-${i}` }>
                {`R$ ${(data.price).replaceAll('.', ',')}` }
              </td>
              <td data-testid={ `${SUB_TOTAL}-${i}` }>
                {`R$ ${(data.qtd * data.price).toFixed(2).replaceAll('.', ',')}` }
              </td>
              <button
                type="button"
                data-testid={ `${REMOVE}-${i}` }
                onClick={ () => removeProduct(data.name) }
              >
                Remover
              </button>
            </tr>))}
        </table>
        <p data-testid={ TOTAL_PRICE }>
          TOTAL:
          {` R$ ${totalPrice.toFixed(2).replaceAll('.', ',')}`}
        </p>
      </div>

      <form>
        <h3>Detalhes e Endereço para Entrega</h3>
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select data-testid={ SELECT_SELLER }>
            <option
              text="Fulana Pereira"
              value="Fulana Pereira"
            >
              Fulana Pereira
            </option>
          </select>
        </label>
        <label htmlFor="adress">
          Endereço
          <input
            type="text"
            placeholder="Rua Tal, Bairro Tal"
            data-testid={ ADRESS }
            value={ deliveryAddress }
            onChange={ (event) => setAdress(event.target.value) }
          />
        </label>
        <label htmlFor="adress-number">
          Número
          <input
            type="number"
            placeholder="123"
            data-testid={ ADRESS_NUMBER }
            value={ deliveryNumber }
            onChange={ (event) => setNumber(event.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid={ SUBMIT_ORDER }
          onClick={ handleClick }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}

Checkout.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
