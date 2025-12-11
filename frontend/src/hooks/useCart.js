import { useState, useEffect } from "react";

export const useCart = () => {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");
        if (!stored) return [];
        try {
            const parsed = JSON.parse(stored);
            // Filter out any nulls
            return parsed.filter((item) => item !== null);
        } catch {
            return [];
        }
    });

    const removeFromCart = (productId) => {
        setCart((prev) =>
            prev.filter((item) => item?.product_id !== productId)
        );
    };

    const [showCart, setShowCart] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem("cart", JSON.stringify(cart));
        } catch (e) {
            console.error("Failed to persist cart to localStorage", e);
        }
        try {
            // Notify other components (e.g., Navbar) that cart changed
            if (typeof window !== "undefined") {
                window.dispatchEvent(
                    new CustomEvent("cartUpdated", { detail: cart })
                );
            }
        } catch (e) {
            console.log(e);
            // ignore
        }
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
        setCart((prev) => [...prev, product]);
        closeModal();
    };

    const toggleCart = () => setShowCart((prev) => !prev);
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
        clearCart,
        removeFromCart,
    };
};
