import React from "react"; 
import getImageUrl from '../utils/getImageUrl';

const Modal = ({ selectedProduct, showModal, closeModal, addToCart }) => {
  if (!showModal || !selectedProduct) return null;

  return (
    <dialog id="add-product" open>
      <div id="add-product-header">
        <h3>{selectedProduct.name}</h3>
        <p>{selectedProduct.description}</p>
      </div>

      <div id="add-product-image">
        <img src={getImageUrl(selectedProduct.image_url)} alt={selectedProduct.name} />
      </div>

      <div id="add-product-price">
        <p>Price: {selectedProduct.price}€</p>
      </div>

      {selectedProduct.options && selectedProduct.options.length > 0 && (
        <div id="add-product-options">
          <h4>Options:</h4>
          <div className="options-buttons">
            {selectedProduct.options.map((opt) => (
              <button key={opt.option_id} type="button" onClick={() => {}}>
                {opt.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div id="add-product-actions">
        <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </dialog>
  );
};

export default Modal;
