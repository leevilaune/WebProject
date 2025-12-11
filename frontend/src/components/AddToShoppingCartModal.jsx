import React from "react";
import getImageUrl from '../utils/getImageUrl';

const Modal = ({ selectedProduct, showModal, closeModal, addToCart }) => {
  if (!showModal || !selectedProduct) return null;

  return (
    <dialog id="add-product" open>
      <h3>{selectedProduct.name}</h3>
      <p>{selectedProduct.description}</p>
      <img src={getImageUrl(selectedProduct.image_url)} alt={selectedProduct.name} />
      <p>Price: {selectedProduct.price}€</p>

      {selectedProduct.options && selectedProduct.options.length > 0 && (
        <div>
          <h4>Options:</h4>
          {selectedProduct.options.map((opt) => (
            <button key={opt.option_id} type="button" onClick={() => {}}>
              {opt.name}
            </button>
          ))}
        </div>
      )}

      <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
      <button onClick={closeModal}>Cancel</button>
    </dialog>
  );
};

export default Modal;
