import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useOrder } from "../hooks/useOrder";

const PaymentView = () => {
  const { cart, setCart } = useCart();
  const { placeOrder, loading, error } = useOrder();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const goBack = () => navigate("/menu");

  const clearCart = () => setCart([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");

      if (!token || !userId) {
        alert("No token or user ID found.");
        setLoadingUser(false);
        return;
      }

      try {
        const res = await fetch(`https://test.onesnzeroes.dev/api/v1/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Error fetching user: ${res.status}`);

        const data = await res.json();
        setUserInfo(data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch user info");
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
      alert("No token found. Cannot place order.");
      return;
    }

    const productCounts = {};
    cart.forEach((item) => {
      productCounts[item.product_id] = (productCounts[item.product_id] || 0) + 1;
    });

    const uniqueProductIds = [...new Set(cart.map((item) => item.product_id))];
    const orderPosts = [];

    let maxCount = Math.max(...Object.values(productCounts));
    for (let i = 0; i < maxCount; i++) {
      const batch = [];
      let batchPrice = 0;
      uniqueProductIds.forEach((id) => {
        if (productCounts[id] > 0) {
          const item = cart.find((p) => p.product_id === id);
          batch.push(id);
          batchPrice += Number(item.price);
          productCounts[id]--;
        }
      });
      if (batch.length > 0) {
        orderPosts.push({
          delivery_address: userInfo?.address || "Default address",
          price: batchPrice,
          user_id: userId,
          product_ids: batch,
        });
      }
    }

    try {
      for (const postData of orderPosts) {
        await placeOrder({
          cart: postData.product_ids.map((id) => {
            const item = cart.find((p) => p.product_id === id);
            return { product_id: id, price: Number(item.price) };
          }),
          deliveryAddress: postData.delivery_address,
          userId,
          token,
        });
      }

      clearCart();
      alert("Payment successful!");
      navigate("/menu");
    } catch (err) {
      alert("Error placing order: " + err.message);
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

      {error && <p>{error}</p>}

      <button onClick={handlePay} disabled={loading}>
        {loading ? "Placing order..." : "Pay"}
      </button>
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default PaymentView;
