import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { getSales } from '../api/fetchApi';
import Header from '../components/Header';

export default function OrderDetails({ history }) {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getAllSales = async () => {
      const data = await getSales();
      setSales(data.data);
      // console.log(data);
    };
    getAllSales();
    console.log(sales);
  }, [sales]);

  return (
    <div>
      <Header history={ history } />
      OrdersDetails
      {sales.length > 0
        && sales.map((sale, index) => (
          <div key={ index }>

            <p
              data-testid={ `seller_orders__element-order-id-${sale.id}` }
            >
              {sale.id}
            </p>
            <p
              data-testid={ `seller_orders__element-delivery-status-${sale.id}` }
            >
              {sale.status}
            </p>
            <p
              data-testid={ `seller_orders__element-order-date-${sale.id}` }
            >
              {sale.saleDate}
            </p>
            <button
              data-testid="seller_order_details__button-preparing-check"
              type="button"
            >
              PREPARAR PEDIDO
            </button>
            <button
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
            >
              SAIU PARA ENTREGA
            </button>
            <p
              data-testid={ `seller_orders__element-card-price-${sale.id}` }
            >
              {sale.totalPrice}
            </p>
            <p
              data-testid={ `seller_orders__element-card-address-${sale.id}` }
            >
              {sale.deliveryAddress}
              <span>{sale.deliveryNumber}</span>
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
