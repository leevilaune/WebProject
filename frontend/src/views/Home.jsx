import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useFilter } from "../hooks/useFilter";
import { useCartContext } from "../contexts/CartContext";
import { useAllergens } from "../hooks/useAllergeens";
import FilterMenu from "../components/FilterMenu";
import ProductList from "../components/ProductList";
import ProductDialog from "../components/ProductDialog";
import { API_BASE } from "../config/api";

const Home = () => {
    const products = useProducts();
    const allergens = useAllergens();
    const categories = [...new Set(products.map((p) => p.category))];

    // Use cart from context (provided by App)
    const { addToCart } = useCartContext() || {};
    const {
        selectedCategories,
        selectedAllergens,
        toggleCategory,
        toggleAllergen,
        filterProducts,
    } = useFilter();

    // Cart toggle is available from context; no DOM events needed

    const [showFilter, setShowFilter] = useState(false);
    const toggleFilter = () => setShowFilter(!showFilter);

    const [showAllergens, setShowAllergens] = useState(false);
    const toggleAllergens = () => setShowAllergens(!showAllergens);

    const [optionDialogProduct, setOptionDialogProduct] = useState(null);
    const filteredProducts = filterProducts(products);
    const token = localStorage.getItem("token");

    const openOptionDialog = (product) => setOptionDialogProduct(product);

    const handleConfirmOptions = async (selectedOptionIds) => {
        if (!optionDialogProduct) return;

        try {
            const res = await fetch(`${API_BASE}/api/v1/product/add/copy`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: optionDialogProduct.name,
                    price: optionDialogProduct.price,
                    category: optionDialogProduct.category,
                    description: optionDialogProduct.description,
                    image_url: optionDialogProduct.image_url,
                    option_ids: selectedOptionIds,
                    allergen_ids:
                        optionDialogProduct.allergens?.map(
                            (a) => a.allergen_id
                        ) || [],
                }),
            });
            const data = await res.json();
            addToCart(data.new);
            setOptionDialogProduct(null);
        } catch (err) {
            console.error("Failed to add product with options:", err);
            alert("Failed to add product with options");
        }
    };

    return (
        <div id="home-page">
            <header id="home-header">
                <h2>Products</h2>
            </header>

            <section id="filter-section">
                <button id="filter-toggle-btn" onClick={toggleFilter}>
                    Filter
                </button>
                <div id="filter-menu-container">
                    <FilterMenu
                        showFilter={showFilter}
                        toggleFilter={toggleFilter}
                        toggleCategory={toggleCategory}
                        toggleAllergens={toggleAllergens}
                        showAllergens={showAllergens}
                        toggleAllergen={toggleAllergen}
                        selectedCategories={selectedCategories}
                        selectedAllergens={selectedAllergens}
                        allergens={allergens}
                        categories={categories}
                    />
                </div>
            </section>

            <section id="products-section">
                <ProductList
                    products={
                        filteredProducts.length ? filteredProducts : products
                    }
                    openModal={openOptionDialog}
                />
            </section>

            {optionDialogProduct && (
                <div id="product-dialog-wrapper">
                    <ProductDialog
                        product={optionDialogProduct}
                        options={optionDialogProduct.options || []}
                        onClose={() => setOptionDialogProduct(null)}
                        onConfirm={handleConfirmOptions}
                    />
                </div>
            )}

            <footer id="cart-footer"></footer>
        </div>
    );
};

export default Home;
