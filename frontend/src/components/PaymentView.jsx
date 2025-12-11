 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useOrder } from "../hooks/useOrder";

const PaymentView = () => {
  const { cart, clearCart } = useCart();
  const { placeOrder, loading, error } = useOrder();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const goBack = () => navigate("/menu");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");

      if (!token || !userId) {
        setLoadingUser(false);
        setUserInfo(null);
        return;
      }

      try {
        const res = await fetch(`https://test.onesnzeroes.dev/api/v1/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
          setUserInfo(null);
        } else {
          const data = await res.json();
          setUserInfo(data);
        }
      } catch {
        setUserInfo(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const handlePay = async () => {
    const token = localStorage.getItem("token");
    const userId = parseInt(localStorage.getItem("user_id"));

    if (!token) {
      alert("You must be logged in to pay.");
      navigate("/login");
      return;
    }

    if (!cart || cart.length === 0) {
      alert("Cart is empty.");
      return;
    }

    try {
      const created = await placeOrder({
        deliveryAddress: userInfo?.address || "Default address",
        cart,
        userId,
        token,
        paymentMethod
      });

      clearCart();
      alert(`Order placed. Order number: ${created?.order_number ?? "unknown"}`);
      navigate("/menu");
    } catch (err) {
      alert("Error placing order: " + (err?.message || String(err)));
    }
  };

  if (loadingUser) return <p>Loading user info...</p>;
   const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <div id="payment-view">
      <h2>Payment</h2>

      <style>
        {`
          .payment-radio {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            font-size: 16px;
          }
          .payment-radio label {
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
          }
        `}
      </style>

      <div id="payment-user-info">
        <p className="payment-username">Name: {userInfo?.username || "N/A"}</p>
        <p className="payment-email">Email: {userInfo?.email || "N/A"}</p>
        <p className="payment-address">Address: {userInfo?.address || "N/A"}</p>
      </div>

      <div id="payment-items">
        <h3>Items</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="payment-cart-list">
            {cart.map((item, i) => (
              <li key={i} className="payment-cart-item">
                {item.name} - {item.price}€
              </li>
            ))}
          </ul>
        )}
      </div>

      <div id="payment-methods">
        <p>Payment methods</p>

        <div className="payment-radio">
          <label>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            Cash
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={() => setPaymentMethod("bank")}
            />
            Bank payment
          </label>
        </div>
      </div>

        <div id="payment-total" style={{ marginTop: "1rem", fontWeight: "bold" }}>
        Total: {totalPrice}€
      </div>

      {error && <p className="payment-error" style={{ color: "red" }}>{error}</p>}

      <div id="payment-buttons">
        <button onClick={handlePay} disabled={loading}>
          {loading ? "Placing order..." : "Pay"}
        </button>
        <button onClick={goBack}>Back</button>
      </div>
    </div>
  );
};

export default PaymentView;
