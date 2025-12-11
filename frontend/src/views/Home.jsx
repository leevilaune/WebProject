import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useFilter } from '../hooks/useFilter';
import { useCart } from '../hooks/useCart';
import FilterMenu from '../components/FilterMenu';
import ProductList from '../components/ProductList';
import Modal from '../components/AddToShoppingCartModal';
import ShoppingCart from '../components/ShoppingCart';
import { useNavigate } from 'react-router';
import { useAllergens } from '../hooks/useAllergeens';


const Home = () => {
  const products = useProducts();
  const allergens = useAllergens();
  const categories = [...new Set(products.map(p => p.category))];

  // filter hook
  const {  toggleCategory, toggleAllergen, filterProducts } = useFilter();
  // cart hook
  const { cart, showCart, showModal, selectedProduct, openModal, closeModal, addToCart, toggleCart } = useCart();

  const navigate = useNavigate();
  const goToPayment = () => navigate("/payment");

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
        allergens={allergens}
        categories={categories}

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

        <ShoppingCart
        cart={cart}
        showCart={showCart}
        toggleCart={toggleCart}
        goToPayment={goToPayment} 
        />
    </>
  );
};

export default Home;
