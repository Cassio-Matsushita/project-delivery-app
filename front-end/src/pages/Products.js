import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { getProducts } from '../api/fetchApi';

export default function Products({ history }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await getProducts();
      setProducts(data);
    };

    const calculateTotalPrice = () => {
      let total = 0;
      if (cart.length > 0) {
        for (let i = 0; i < cart.length; i += 1) {
          const item = cart[i];
          const itemTotal = item.price * item.qtd;
          total += itemTotal;
          setTotalPrice(total.toFixed(2).replace('.', ','));
        }
      }
    };
    getAllProducts();
    calculateTotalPrice();
  }, [totalPrice, cart, setTotalPrice]);

  const addToCart = (name, price) => {
    const copyCart = [...cart];

    const items = copyCart.find((item) => item.name === name);

    if (!items) copyCart.push({ name, price, qtd: 1 });

    if (items) items.qtd += 1;

    setCart(copyCart);
    localStorage.setItem('cart', JSON.stringify(copyCart));
  };

  const removeFromCart = (name) => {
    const copyCart = [...cart];

    const item = copyCart.find((product) => product.name === name);

    if (item && item.qtd >= 1) {
      item.qtd -= 1;
      setCart(copyCart);
      localStorage.setItem('cart', JSON.stringify(copyCart));
    } else {
      const arrayFiltered = copyCart.filter((product) => product.name !== name);
      setCart(arrayFiltered);
      // localStorage.setItem('cart', JSON.stringify(copyCart));
    }
  };

  // const manualInput = (event, name, price) => {
  // const inputValue = Number(event.target.value); // Converte o valor digitado em um número
  // setCart((prevCart) => prevCart.map((item) => {
  //   if (item.name === name) {
  //     return { ...item, qtd: inputValue }; // Atualiza a quantidade do item no carrinho com o valor digitado pelo usuário
  //   }
  //   console.log(cart);
  //   return ({ name, price, qtd: inputValue });
  // copyCart.push({ name, price, qtd: 1 });
  // }));

  // const copyCart = [...cart];
  // const inputValue = Number(event.target.value);

  // const items = copyCart.find((item) => item.name === name);

  // if (!items) copyCart.push({ name, price, qtd: inputValue });

  // if (items) items.qtd = inputValue;

  // setCart(copyCart);
  // };

  return (
    <div>
      <Header history={ history } />
      <button
        type="button"
        disabled={ !cart.length > 0 }
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
      >
        Ver Carrinho: R$
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {totalPrice && ` ${totalPrice}`}
        </span>
      </button>

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
              onClick={ () => removeFromCart(product.name) }
            >
              -
            </button>
            <input
              type="text"
              defaultValue={ 0 }
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              // onChange={ () => {} }
              value={ cart.find((item) => item.name === product.name)?.qtd }
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              type="button"
              onClick={ () => addToCart(product.name, product.price) }
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
