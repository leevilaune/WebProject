// single product item with add to cart button
import getImageUrl from '../utils/getImageUrl'
const ProductItem = ({ product, openModal }) => (
  <li>
    {product.name} {product.price}€ {product.description} <img src={getImageUrl(product.image_url)} alt={product.name} />
 
    <button onClick={() => openModal(product)}>Add to shopping cart</button>
  </li>
);

export default ProductItem;
