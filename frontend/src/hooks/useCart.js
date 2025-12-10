import { useState,useEffect } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
        return JSON.parse(stored);
        } else {
        return [];
        }
  })
  
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

  const addToCart = () => {
    setCart([...cart, selectedProduct]);
    closeModal();
  };

  const toggleCart = () => setShowCart(!showCart); 

  return { cart, showCart,setShowCart, showModal, selectedProduct, openModal, closeModal, addToCart, toggleCart };
};
