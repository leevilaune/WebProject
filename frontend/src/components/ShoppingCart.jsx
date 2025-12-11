import { useNavigate } from "react-router-dom";
import getImageUrl from '../utils/getImageUrl';

const ShoppingCart = ({ cart, showCart, toggleCart, goToPayment }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!showCart) return null;

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <dialog id="shopping-cart-dialog" open>
      <h3>Shopping cart</h3>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} {item.price}€ <img src={getImageUrl(item.image_url)} alt={item.name} />
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        token ? (
          <button onClick={goToPayment}>Payment</button>
        ) : (
          <div>
            <p>Please login to complete your order</p>
            <button onClick={handleLoginRedirect}>Login</button>
          </div>
        )
      )}
      <button onClick={toggleCart}>Close</button>
    </dialog>
  );
};

export default ShoppingCart;
