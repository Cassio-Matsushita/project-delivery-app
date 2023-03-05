import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { getProducts } from '../api/fetchApi';

export default function Products({ history }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await getProducts();
      setProducts(data);
    };
    getAllProducts();
  }, []);

  return (
    <div>
      <Header history={ history } />
      {products.length > 0
        && products.map((product, index) => (
          <div key={ index }>
            <p
              data-testid={ `customer_products__element-card-title-${product.id}` }
            >
              {product.name}
            </p>
            <p
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              {product.price.replaceAll('.', ',')}
            </p>
            <img
              src={
                product.name === 'Skol Lata 250ml'
                  ? 'http://localhost:3001/images/skol_lata_350ml.jpg'
                  : `http://localhost:3001/images/${product.name
                    .replaceAll(' ', '_')
                    .toLowerCase()}.jpg`
              }
              alt=""
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              width="5%"
            />
            <button
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
              type="button"
              onClick={ () => {} }
            >
              -
            </button>
            <input
              type="number"
              defaultValue={ 0 }
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              onChange={ () => {} }
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              type="button"
              onClick={ () => {} }
            >
              +
            </button>
          </div>
        ))}
    </div>
  );
}

Products.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
