import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("authToken");

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                "https://test.onesnzeroes.dev/api/v1/product/all"
            );
            const data = await res.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching products:", err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (productId) => {
        if (!window.confirm(`Delete product ${productId}?`)) return;
        try {
            await fetch(
                `https://test.onesnzeroes.dev/api/v1/product/${productId}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            fetchProducts();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const modifyProduct = async (updatedProduct) => {
        try {
            await fetch(
                `https://test.onesnzeroes.dev/api/v1/product/${updatedProduct.product_id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProduct),
                }
            );
            fetchProducts();
        } catch (err) {
            console.error("Modify failed:", err);
        }
    };

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;

    return (
        <div>
            {products.map((product) => (
                <ProductCard
                    key={product.product_id}
                    product={product}
                    onDelete={deleteProduct}
                    onModify={modifyProduct}
                />
            ))}
        </div>
    );
};

export default ProductList;
