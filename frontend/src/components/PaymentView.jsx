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
      } catch (err) {
        console.error("Failed to fetch user:", err);
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
        token
      });

      clearCart();
      alert(`Order placed. Order number: ${created?.order_number ?? "unknown"}`);
      navigate("/menu");
    } catch (err) {
      alert("Error placing order: " + (err?.message || String(err)));
    }
  };

  if (loadingUser) return <p>Loading user info...</p>;

  return (
    <div>
      <h2>Payment</h2>

      <p>Name: {userInfo?.username || "N/A"}</p>
      <p>Email: {userInfo?.email || "N/A"}</p>
      <p>Address: {userInfo?.address || "N/A"}</p>

      <h3>Items</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, i) => (
            <li key={i}>
              {item.name} - {item.price}€
            </li>
          ))}
        </ul>
      )}

      <p>Payment methods</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handlePay} disabled={loading}>
        {loading ? "Placing order..." : "Pay"}
      </button>
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default PaymentView;
