import React from "react";

const Modal = ({ selectedProduct, showModal, closeModal, addToCart }) => {
  if (!showModal || !selectedProduct) return null;

  return (
    <div>
      <h3>{selectedProduct.name}</h3>
      <p>{selectedProduct.description}</p>
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
    </div>
  );
};

export default Modal;
