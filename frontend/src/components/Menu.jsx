// Menu.jsx
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

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function load() {
            try {
                const [p, o, a] = await Promise.all([
                    fetch(`${API_BASE}/api/v1/product/all`).then((r) =>
                        r.json()
                    ),
                    fetch(`${API_BASE}/api/v1/misc/option`).then((r) =>
                        r.json()
                    ),
                    fetch(`${API_BASE}/api/v1/misc/allergen`).then((r) =>
                        r.json()
                    ),
                ]);

                setProducts(p);
                setOptions(o);
                setAllergens(a);
            } catch (err) {
                console.error("Error loading:", err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    if (loading) return <p>Loading menu...</p>;

    return (
        <div>
            <h1>Menu</h1>

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

                            {/* Allergens shown ONLY here */}
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

            {selectedProduct && (
                <ProductDialog
                    product={selectedProduct}
                    options={options}
                    onClose={() => setSelectedProduct(null)}
                    onConfirm={(selectedOptionIds) => {
                        console.log("Selected options:", selectedOptionIds);
                        setSelectedProduct(null);
                    }}
                />
            )}
        </div>
    );
};

export default Menu;
