import React, { useState } from "react";
import { useProducts } from '../hooks/useProducts';
import { useFilter } from '../hooks/useFilter';
import { useCart } from '../hooks/useCart';
import { useAllergens } from '../hooks/useAllergeens';
import FilterMenu from '../components/FilterMenu';
import ProductList from '../components/ProductList';
import ShoppingCart from '../components/ShoppingCart';
import ProductDialog from '../components/ProductDialog';
import { useNavigate } from 'react-router';
import { API_BASE } from "../config/api";

const Home = () => {
  const products = useProducts();
  const allergens = useAllergens();
  const categories = [...new Set(products.map(p => p.category))];

  const { cart, showCart, addToCart, toggleCart } = useCart();
  const { toggleCategory, toggleAllergen, filterProducts } = useFilter();

  const navigate = useNavigate();
  const goToPayment = () => navigate("/payment");

  const [showFilter, setShowFilter] = useState(false);
  const toggleFilter = () => setShowFilter(!showFilter);

  const [showAllergens, setShowAllergens] = useState(false);
  const toggleAllergens = () => setShowAllergens(!showAllergens);

  const [optionDialogProduct, setOptionDialogProduct] = useState(null);
  const filteredProducts = filterProducts(products);
  const token = localStorage.getItem("token");

  // Open ProductDialog
  const openOptionDialog = (product) => setOptionDialogProduct(product);

  // Confirm options from ProductDialog
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
          allergen_ids: optionDialogProduct.allergens?.map(a => a.allergen_id) || [],
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
        <button id="filter-toggle-btn" onClick={toggleFilter}>Filter</button>
        <div id="filter-menu-container">
          <FilterMenu
            showFilter={showFilter}
            toggleFilter={toggleFilter}
            toggleCategory={toggleCategory}
            toggleAllergens={toggleAllergens}
            showAllergens={showAllergens}
            toggleAllergen={toggleAllergen}
            allergens={allergens}
            categories={categories}
          />
        </div>
      </section>

      <section id="products-section">
        <ProductList
          products={filteredProducts.length ? filteredProducts : products}
          openModal={openOptionDialog}
        />
      </section>

      {/* Product options dialog */}
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

      {/* Shopping cart button */}
      <footer id="cart-footer">
        <button
          id="shopping-cart-btn"
          onClick={toggleCart}
          aria-label={`Shopping cart (${cart.length})`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ verticalAlign: 'middle' }}
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span style={{ marginLeft: 8 }}>({cart.length})</span>
        </button>

        <div id="shopping-cart-dialog-wrapper">
          <ShoppingCart
            cart={cart}
            showCart={showCart}
            toggleCart={toggleCart}
            goToPayment={goToPayment}
          />
        </div>
      </footer>
    </div>
  );
};

export default Home;
