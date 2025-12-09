import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useFilter } from '../hooks/useFilter';
import { useCart } from '../hooks/useCart';
import FilterMenu from '../components/FilterMenu';
import ProductList from '../components/ProductList';
import Modal from '../components/Modal';
import ShoppingCart from '../components/ShoppingCart';

const Home = () => {
  const products = useProducts();

  // filter hook
  const {  toggleCategory, toggleAllergen, filterProducts } = useFilter();

  // cart hook
  const { cart, showCart, showModal, selectedProduct, openModal, closeModal, addToCart, toggleCart } = useCart();

  // show/hide menus
  const [showFilter, setShowFilter] = useState(false);
  const toggleFilter = () => setShowFilter(!showFilter);

  const [showAllergens, setShowAllergens] = useState(false);
  const toggleAllergens = () => setShowAllergens(!showAllergens);

  const filteredProducts = filterProducts(products);

  return (
    <>
      <h2>Products</h2>

      {/* filter menu */}
      <button onClick={toggleFilter}>Filter</button>
      <FilterMenu
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        toggleCategory={toggleCategory}
        toggleAllergens={toggleAllergens}
        showAllergens={showAllergens}
        toggleAllergen={toggleAllergen}
      />

      {/* product list with add to shopping cart button */}
      <ProductList products={filteredProducts.length ? filteredProducts : products} openModal={openModal} />

      {/* modal for editing or adding to shopping cart */}
      <Modal
        showModal={showModal}
        selectedProduct={selectedProduct}
        closeModal={closeModal}
        addToCart={addToCart}
      />

      {/* shopping cart button */}
      <button onClick={toggleCart}>Shopping cart ({cart.length})</button>
      <ShoppingCart cart={cart} showCart={showCart} toggleCart={toggleCart} />
    </>
  );
};

export default Home;
