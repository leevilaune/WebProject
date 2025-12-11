import { useState } from "react";


export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cloneProduct = async (product, token) => {
    // product: full product object from cart (must contain name, price, category, description, image_url, options, allergens)
    const option_ids = (product.options || []).map(o => o.option_id).filter(Boolean);
    const allergen_ids = (product.allergens || []).map(a => a.allergen_id).filter(Boolean);

    const body = {
      name: product.name,
      price: Number(product.price),
      category: product.category || "",
      description: product.description || "",
      image_url: product.image_url || "",
      option_ids: option_ids,
      allergen_ids: allergen_ids
    };

    const res = await fetch("https://test.onesnzeroes.dev/api/v1/product/add/copy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.message || data?.error || `Clone failed (status ${res.status})`;
      throw new Error(msg);
    }

    // API returned { new: { product_id: ... } } per docs
    if (!data?.new?.product_id) {
      throw new Error("Clone response missing new.product_id");
    }

    return data.new.product_id;
  };

  const placeOrder = async ({ deliveryAddress, cart, userId, token }) => {
    setLoading(true);
    setError(null);

    try {
      if (!Array.isArray(cart) || cart.length === 0) {
        throw new Error("Cart is empty");
      }
      if (!token) {
        throw new Error("Missing auth token");
      }
      
      const productBuckets = {};
      cart.forEach(item => {
        const id = Number(item.product_id);
        if (!productBuckets[id]) productBuckets[id] = [];
        productBuckets[id].push(item);
      });

      const finalProductIds = [];

      for (const idStr of Object.keys(productBuckets)) {
        const id = Number(idStr);
        const bucket = productBuckets[id];
        finalProductIds.push(id);

        if (bucket.length > 1) {
          const clonesNeeded = bucket.length - 1;
          const productToClone = bucket[0];

          for (let i = 0; i < clonesNeeded; i++) {
            const newId = await cloneProduct(productToClone, token);
            finalProductIds.push(Number(newId));
          }
        }
      }

      const price = Math.round(cart.reduce((sum, it) => sum + Number(it.price || 0), 0) * 100) / 100;

      const orderBody = {
        delivery_address: deliveryAddress || "Default address",
        price,
        user_id: Number(userId),
        product_ids: finalProductIds
      };

      console.log("ORDER SENT:", orderBody);

      const orderRes = await fetch("https://test.onesnzeroes.dev/api/v1/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderBody)
      });

      const orderData = await orderRes.json();
      console.log("ORDER RESPONSE:", orderData);

      if (!orderRes.ok) {
        const msg = orderData?.message || orderData?.error || `Order failed (status ${orderRes.status})`;
        throw new Error(msg);
      }

      setLoading(false);
      return orderData.new || orderData;
    } catch (err) {
      setError(err.message);
      console.error("ORDER ERROR:", err);
      setLoading(false);
      throw err;
    }
  };

  return { placeOrder, loading, error };
};
