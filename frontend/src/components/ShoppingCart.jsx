const ShoppingCart = ({ cart, showCart, toggleCart, openPayment }) => {
  if (!showCart) return null;

  return (
    <div>
      <h3>Shopping cart</h3>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} {item.price}€</li>
          ))}
        </ul>
      )}
      <button onClick={toggleCart}>Close</button>
      <button onClick={openPayment}>Payment</button>

    </div>
  );
};

export default ShoppingCart;
