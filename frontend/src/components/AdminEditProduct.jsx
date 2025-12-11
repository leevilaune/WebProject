import React, { useEffect, useState } from "react";
import AdminProductCard from "./AdminProductCard";
import { API_BASE } from "../config/api";

const AdminEditProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/v1/product/all`);
            const data = await res.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("error fetching products:", err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (productId) => {
        if (!window.confirm(`Delete product ${productId}?`)) return;

        try {
            const res = await fetch(`${API_BASE}/api/v1/product/${productId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Delete failed");

            setProducts((prev) =>
                prev.filter((p) => p.product_id !== productId)
            );
        } catch (err) {
            console.error("delete failed:", err);
        }
    };

    const modifyProduct = async (updatedProduct) => {
        try {
            const res = await fetch(
                `${API_BASE}/api/v1/product/${updatedProduct.product_id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProduct),
                }
            );

            if (!res.ok) throw new Error("modify failed");

            setProducts((prev) =>
                prev.map((p) =>
                    p.product_id === updatedProduct.product_id
                        ? { ...p, ...updatedProduct }
                        : p
                )
            );
        } catch (err) {
            console.error("modify failed:", err);
        }
    };

    if (loading) return <p>Loading products...</p>;

    return (
        <div>
            {products.map((product) => (
                <AdminProductCard
                    key={product.product_id}
                    product={product}
                    onDelete={deleteProduct}
                    onModify={modifyProduct}
                />
            ))}
        </div>
    );
};

export default AdminEditProduct;
