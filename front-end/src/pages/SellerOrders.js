import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getSales } from '../api/fetchApi';

export default function SellerOrders({ history }) {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getAllSales = async () => {
      const data = await getSales();
      setSales(data.data);
    };
    getAllSales();
  }, []);

  return (
    <div>
      <Header history={ history } />
      SellerOrders
      {/* {console.log(sales)} */}
      {sales.length > 0
        && sales.map((sale, index) => (
          <div key={ index }>
            <Link to={ `/seller/orders/${sale.id}` }>
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
            </Link>
          </div>))}
    </div>
  );
}

SellerOrders.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
