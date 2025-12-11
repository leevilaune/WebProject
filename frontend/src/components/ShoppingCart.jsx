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
      <div className="cart-header">
        <h3>Shopping cart</h3>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>{" "}
                  <span className="item-price">{item.price}€</span>
                </div>
                {item.image_url && (
                  <img
                    className="item-image"
                    src={getImageUrl(item.image_url)}
                    alt={item.name}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="cart-actions">
        {cart.length > 0 &&
          (token ? (
            <button className="payment-button" onClick={goToPayment}>
              Payment
            </button>
          ) : (
            <div className="login-prompt">
              <p>Please login to complete your order</p>
              <button onClick={handleLoginRedirect}>Login</button>
            </div>
          ))}

        <button className="close-cart-button" onClick={toggleCart}>
          Close
        </button>
      </div>
    </dialog>
  );
};

export default ShoppingCart;
