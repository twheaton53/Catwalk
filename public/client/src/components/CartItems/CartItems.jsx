import React, { useContext } from 'react';
import { GrCart } from 'react-icons/gr';
import ProductInfo from '../../store/product';

const CartItems = () => {
  const ctx = useContext(ProductInfo);
  const { cart } = ctx;

  return (
    <div className="cart-items">
      {' '}
      <GrCart />
      {' '}
      {cart.length > 0 && cart.length}
    </div>
  );
};

export default CartItems;
