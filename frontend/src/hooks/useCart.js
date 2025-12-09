import { useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  return { cart, showCart, showModal, selectedProduct, openModal, closeModal, addToCart, toggleCart };
};
