
import React, { useState } from "react";

const ProductDialog = ({ product, options, onClose, onConfirm }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (optionId) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          padding: "1rem",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "500px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          ✖
        </button>

        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>€{product.price.toFixed(2)}</p>

        <h3>Select Options</h3>
        {options.map((o) => (
          <div key={o.option_id}>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes(o.option_id)}
                onChange={() => toggleOption(o.option_id)}
              />
              {o.name} - {o.description}
            </label>
          </div>
        ))}

        <div style={{ marginTop: "1rem" }}>
          <button onClick={() => onConfirm(selectedOptions)}>Confirm</button>
          <button onClick={onClose} style={{ marginLeft: "1rem" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDialog;
