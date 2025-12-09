const Modal = ({ showModal, selectedProduct, closeModal, addToCart }) => {
  if (!showModal || !selectedProduct) return null;

  return (
    <div>
      <h3>{selectedProduct.name}</h3>
      <p>{selectedProduct.price}€</p>
      <button onClick={() => console.log("edit clicked")}>Edit</button>
      <button onClick={addToCart}>Add to shopping cart</button>
      <button onClick={closeModal}>Decline</button>
    </div>
  );
};

export default Modal;
