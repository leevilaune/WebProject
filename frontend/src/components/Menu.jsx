import React, { useState, useEffect } from "react";
import ProductDialog from "./ProductDialog";
import { API_BASE } from "../config/api";

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState([]);
    const [allergens, setAllergens] = useState([]);
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
        const loadData = async () => {
            try {
                const [pRes, oRes, aRes] = await Promise.all([
                    fetch(`${API_BASE}/api/v1/product/all`),
                    fetch(`${API_BASE}/api/v1/misc/option`),
                    fetch(`${API_BASE}/api/v1/misc/allergen`),
                ]);

                const [p, o, a] = await Promise.all([
                    pRes.json(),
                    oRes.json(),
                    aRes.json(),
                ]);

                setProducts(p);
                setOptions(o);
                setAllergens(a);
            } catch (err) {
                console.error("Error loading:", err);
            } finally {
                setLoading(false);
            }
        };

        const loadUserAddress = async () => {
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

        Promise.all([loadData(), loadUserAddress()]);
    }, [token]);

    if (loading) return <p>Loading menu...</p>;

    const addToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const removeFromCart = (id) => {
        const newCart = cart.filter((item) => item.product_id !== id);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const handlePay = async () => {
        try {
            const product_ids = cart.map((p) => p.product_id);
            const totalPrice = cart.reduce((sum, p) => sum + p.price, 0);

            const res = await fetch(`${API_BASE}/api/v1/order/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    delivery_address: address,
                    price: totalPrice,
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

            <button onClick={() => setShowCart(true)}>
                Cart ({cart.length})
            </button>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {products.map((p) => {
                    const productAllergens = p.allergens
                        ? [...new Set(p.allergens.map((a) => a.allergen_id))]
                              .map((id) =>
                                  allergens.find((al) => al.allergen_id === id)
                              )
                              .filter(Boolean)
                        : [];

                    return (
                        <div
                            key={p.product_id}
                            style={{
                                border: "1px solid gray",
                                padding: "1rem",
                                borderRadius: "8px",
                                width: "250px",
                            }}
                        >
                            <img
                                src={p.image_url}
                                alt={p.name}
                                style={{ width: "100%", borderRadius: "6px" }}
                            />

                            <h3>{p.name}</h3>
                            <p>{p.description}</p>
                            <p>
                                <strong>€{p.price.toFixed(2)}</strong>
                            </p>

                            {/* Allergens only on product cards */}
                            {productAllergens.length > 0 && (
                                <div style={{ marginTop: "0.25rem" }}>
                                    <strong>Allergens:</strong>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "0.5rem",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {productAllergens.map((a) => (
                                            <div
                                                key={a.allergen_id}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.25rem",
                                                }}
                                            >
                                                <span>{a.allergen_name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button onClick={() => setSelectedProduct(p)}>
                                Choose Options
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Product dialog */}
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
                                    allergen_ids:
                                        selectedProduct.allergens?.map(
                                            (a) => a.allergen_id
                                        ) || [],
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
                    onClick={() => setShowCart(false)}
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
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "white",
                            padding: "1rem",
                            borderRadius: "8px",
                            width: "90%",
                            maxWidth: "500px",
                            position: "relative",
                        }}
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

                        <h2>Your Cart</h2>

                        {cart.length === 0 && <p>Cart is empty.</p>}

                        {cart.map((item) => (
                            <div
                                key={item.product_id}
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "0.5rem 0",
                                }}
                            >
                                <strong>{item.name}</strong> — €
                                {item.price.toFixed(2)}
                                <button
                                    onClick={() =>
                                        removeFromCart(item.product_id)
                                    }
                                    style={{ marginLeft: "1rem" }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        {/* Delivery address input */}
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

                        {/* Pay button */}
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
