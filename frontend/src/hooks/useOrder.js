import { useState } from "react";

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const placeOrder = async ({ deliveryAddress, cart, userId, token }) => {
    setLoading(true);
    setError(null);

    try {
      const productCount = {};
      cart.forEach(item => {
        const id = Number(item.product_id);
        if (!productCount[id]) productCount[id] = [];
        productCount[id].push(Number(item.price));
      });

      // Generate batches in each batch only one of each product
      const maxCount = Math.max(...Object.values(productCount).map(arr => arr.length));
      const batches = [];

      for (let i = 0; i < maxCount; i++) {
        const batchIds = [];
        let batchPrice = 0;

        for (const id in productCount) {
          if (productCount[id][i] !== undefined) {
            batchIds.push(Number(id));
            batchPrice += productCount[id][i];
          }
        }

        if (batchIds.length > 0) {
          batches.push({
            delivery_address: deliveryAddress,
            price: Math.round(batchPrice * 100) / 100,
            user_id: userId,
            product_ids: batchIds
          });
        }
      }

      const responses = [];

      for (const batch of batches) {
        console.log("ORDER SENT:", batch);
        const res = await fetch("https://test.onesnzeroes.dev/api/v1/order/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(batch),
        });

        const data = await res.json();
        console.log("ORDER RESPONSE:", data);

        if (!res.ok) throw new Error(data?.error || "Failed to place order");
        responses.push(data.new);
      }

      setLoading(false);
      return responses; 
    } catch (err) {
      setError(err.message);
      console.log("ORDER ERROR:", err);
      setLoading(false);
      return null;
    }
  };

  return { placeOrder, loading, error };
};
