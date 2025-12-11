import React, { useState } from "react";

const ModifyProductDialog = ({ product, onClose, onSave }) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);
    const [description, setDescription] = useState(product.description);
    const [image_url, setImageUrl] = useState(product.image_url);

    const handleSave = () => {
        const updatedProduct = {
            ...product,
            name,
            price: parseFloat(price),
            category,
            description,
            image_url,
        };

        onSave(updatedProduct);
        onClose();
    };

    return (
        <div>
            <div>
                <h2>Modify Product</h2>

                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />

                <label>Price</label>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <label>Category</label>
                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Image URL</label>
                <input
                    value={image_url}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ModifyProductDialog;
