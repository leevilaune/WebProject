import ProductItem from './ProductItem';

// list of products
const ProductList = ({ products, openModal }) => (
  <ul>
    {products.map(p => (
      <ProductItem key={p.product_id} product={p} openModal={openModal} />
    ))}
  </ul>
);

export default ProductList;
