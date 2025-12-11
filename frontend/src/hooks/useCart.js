import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [showCart, setShowCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    closeModal();
  };

  const toggleCart = () => setShowCart(!showCart);
  const clearCart = () => setCart([]);

  return {
    cart,
    setCart,
    showCart,
    setShowCart,
    showModal,
    selectedProduct,
    openModal,
    closeModal,
    addToCart,
    toggleCart,
    clearCart
  };
};
