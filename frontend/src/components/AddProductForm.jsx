import React, { useState } from "react";

const AddProductForm = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [optionIds, setOptionIds] = useState("");
    const [allergenIds, setAllergenIds] = useState("");
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Uploading...");

        const token = localStorage.getItem("authToken");
        if (!token) {
            setStatus("Missing token — login first!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("option_ids", optionIds);
        formData.append("allergen_ids", allergenIds);
        if (image) formData.append("image", image);

        try {
            const res = await fetch(
                "https://test.onesnzeroes.dev/api/v1/product/add",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setStatus(`Error: ${data.message || "Failed to add product"}`);
                return;
            }

            setStatus("Product added successfully!");
            setName("");
            setPrice("");
            setCategory("");
            setDescription("");
            setOptionIds("");
            setAllergenIds("");
            setImage(null);
        } catch (err) {
            console.error(err);
            setStatus("Network error — try again.");
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Option IDs (e.g. [1,2])"
                    value={optionIds}
                    onChange={(e) => setOptionIds(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Allergen IDs (e.g. [3])"
                    value={allergenIds}
                    onChange={(e) => setAllergenIds(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button type="submit">Add Product</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default AddProductForm;
