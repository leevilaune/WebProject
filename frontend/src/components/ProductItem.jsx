// single product item with add to cart button
const ProductItem = ({ product, openModal }) => (
  <li>
    {product.name} {product.price}€ {product.description} {product.image_url} 
    <button onClick={() => openModal(product)}>Add to shopping cart</button>
  </li>
);

export default ProductItem;
