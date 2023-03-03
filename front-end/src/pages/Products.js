import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getProducts } from '../api/fetchApi';

export default function Products() {
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
      <Header />
      {products.length > 0
      && (products.map((product, index) => (
        <div key={ index }>
          <p data-testid={ `customer_products__element-card-title-${product.id}` } />
          <p data-testid={ `customer_products__element-card-price-${product.id}` } />
          <img
            src={ `http://localhost:3001/images/${product.name.replaceAll(' ', '_').toLowerCase()}.jpg` }
            alt=""
            data-testid={ `customer_products__img-card-bg-image-${product.id}` }
            width="15%"
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
        </div>)))}
    </div>
  );
}
