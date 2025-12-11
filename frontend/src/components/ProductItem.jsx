import getImageUrl from '../utils/getImageUrl';

const ProductItem = ({ product, openModal }) => (
  <li className="product-item">
    <div className="product-info">
      <h4 className="product-name">{product.name}</h4>
      <p className="product-description">{product.description}</p>
      <p className="product-price">{product.price}€</p>
      {product.image_url && (
        <img
          className="product-image"
          src={getImageUrl(product.image_url)}
          alt={product.name}
        />
      )}
    </div>

    <div className="product-actions">
      <button
        type="button"
        className="add-to-cart-button"
        onClick={() => openModal(product)}
      >
        Add to shopping cart
      </button>
    </div>
  </li>
);

export default ProductItem;
