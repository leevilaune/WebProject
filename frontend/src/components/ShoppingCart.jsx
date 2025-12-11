import { useNavigate } from "react-router-dom";
import getImageUrl from "../utils/getImageUrl";

const ShoppingCart = ({
    cart,
    showCart,
    toggleCart,
    goToPayment,
    removeFromCart,
}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    if (!showCart) return null;

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    // Calculate total price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

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
                                    <span className="item-name">
                                        {item.name}
                                    </span>{" "}
                                    <span className="item-price">
                                        {item.price}€
                                    </span>
                                </div>
                                {item.image_url && (
                                    <img
                                        className="item-image"
                                        src={getImageUrl(item.image_url)}
                                        alt={item.name}
                                    />
                                )}
                                <button
                                    className="delete-item-button"
                                    onClick={() =>
                                        removeFromCart(item.product_id)
                                    }
                                    style={{ marginLeft: "0.5rem" }}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {cart.length > 0 && (
                <div
                    id="cart-total-price"
                    style={{ marginTop: "1rem", fontWeight: "bold" }}
                >
                    Total: {totalPrice.toFixed(2)}€
                </div>
            )}

            <div className="cart-actions" style={{ marginTop: "1rem" }}>
                {cart.length > 0 &&
                    (token ? (
                        <button
                            className="payment-button"
                            onClick={() => {
                                goToPayment();
                                toggleCart();
                            }}
                        >
                            Payment
                        </button>
                    ) : (
                        <div className="login-prompt">
                            <p>Please login to complete your order</p>
                            <button onClick={handleLoginRedirect}>Login</button>
                        </div>
                    ))}

                <button className="close-cart-button" onClick={toggleCart}>
                    ✖
                </button>
            </div>
        </dialog>
    );
};

export default ShoppingCart;
