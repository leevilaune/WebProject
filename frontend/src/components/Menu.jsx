import React, { useState, useEffect } from "react";
import ProductDialog from "./ProductDialog";
import { API_BASE } from "../config/api";

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });
    const [showCart, setShowCart] = useState(false);
    const [address, setAddress] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/v1/product/all`);
                const data = await res.json();
                setProducts(data); // API only returns default products
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        const fetchOptions = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/v1/misc/option`);
                const data = await res.json();
                setOptions(data);
            } catch (err) {
                console.error("Error fetching options:", err);
            }
        };

        const fetchUserAddress = async () => {
            try {
                const userId = localStorage.getItem("user_id");
                if (!userId) return;
                const res = await fetch(`${API_BASE}/api/v1/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setAddress(data.address || "");
            } catch (err) {
                console.error("Error fetching user address:", err);
            }
        };

        Promise.all([
            fetchProducts(),
            fetchOptions(),
            fetchUserAddress(),
        ]).finally(() => setLoading(false));
    }, [token]);

    if (loading) return <p>Loading menu...</p>;

    const addToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const removeFromCart = (productId) => {
        const newCart = cart.filter((p) => p.product_id !== productId);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const handlePay = async () => {
        try {
            const product_ids = cart.map((p) => p.product_id);
            const res = await fetch(`${API_BASE}/api/v1/order/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    delivery_address: address,
                    price: cart.reduce((sum, p) => sum + p.price, 0),
                    user_id: localStorage.getItem("user_id"),
                    product_ids,
                }),
            });

            const data = await res.json();
            console.log("Order response:", data);
            alert("Order placed successfully!");
            setCart([]);
            localStorage.removeItem("cart");
            setShowCart(false);
        } catch (err) {
            console.error("Order failed:", err);
        }
    };

    return (
        <div>
            <h1>Menu</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {products.map((p) => (
                    <div
                        key={p.product_id}
                        style={{
                            border: "1px solid gray",
                            padding: "1rem",
                            borderRadius: "8px",
                        }}
                    >
                        <img
                            src={p.image_url}
                            alt={p.name}
                            style={{ width: "200px", display: "block" }}
                        />
                        <h3>{p.name}</h3>
                        <p>{p.description}</p>
                        <p>€{p.price.toFixed(2)}</p>
                        <button onClick={() => setSelectedProduct(p)}>
                            Choose Options
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={() => setShowCart(true)}
                style={{ marginTop: "1rem" }}
            >
                Open Cart ({cart.length})
            </button>

            {/* Product Options Dialog */}
            {selectedProduct && (
                <ProductDialog
                    product={selectedProduct}
                    options={options}
                    onClose={() => setSelectedProduct(null)}
                    onConfirm={async (selectedOptionIds) => {
                        const res = await fetch(
                            `${API_BASE}/api/v1/product/add/copy`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({
                                    name: selectedProduct.name,
                                    price: selectedProduct.price,
                                    category: selectedProduct.category,
                                    description: selectedProduct.description,
                                    image_url: selectedProduct.image_url,
                                    option_ids: selectedOptionIds,
                                    allergen_ids: selectedProduct.allergens.map(
                                        (a) => a.allergen_id
                                    ),
                                }),
                            }
                        );

                        const data = await res.json();
                        addToCart(data.new);
                        setSelectedProduct(null);
                    }}
                />
            )}

            {/* Shopping Cart Dialog */}
            {showCart && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onClick={() => setShowCart(false)}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "1rem",
                            borderRadius: "8px",
                            width: "90%",
                            maxWidth: "500px",
                            position: "relative",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowCart(false)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                cursor: "pointer",
                            }}
                        >
                            ✖
                        </button>

                        <h2>Shopping Cart</h2>
                        {cart.length === 0 && <p>Cart is empty</p>}
                        {cart.map((p) => (
                            <div
                                key={p.product_id}
                                style={{ marginBottom: "0.5rem" }}
                            >
                                <strong>{p.name}</strong> (€{p.price.toFixed(2)}
                                )
                                <button
                                    onClick={() => removeFromCart(p.product_id)}
                                    style={{ marginLeft: "0.5rem" }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <div style={{ marginTop: "1rem" }}>
                            <label>
                                Delivery Address:
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    style={{
                                        width: "100%",
                                        marginTop: "0.5rem",
                                    }}
                                />
                            </label>
                        </div>

                        <div style={{ marginTop: "1rem" }}>
                            <button onClick={handlePay}>Pay</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
