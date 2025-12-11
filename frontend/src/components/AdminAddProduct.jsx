import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api";

const AdminAddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const [options, setOptions] = useState([]);
    const [allergens, setAllergens] = useState([]);

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedAllergens, setSelectedAllergens] = useState([]);

    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const optRes = await fetch(`${API_BASE}/api/v1/misc/option`);
                const optionsData = await optRes.json();
                setOptions(optionsData);

                const allergRes = await fetch(
                    `${API_BASE}/api/v1/misc/allergen`
                );
                const allergData = await allergRes.json();
                setAllergens(allergData);
            } catch (err) {
                console.error("Fetch error:", err);
                setStatus("Failed to load options/allergens");
            }
        };

        fetchData();
    }, []);

    const toggleOption = (id) => {
        setSelectedOptions((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleAllergen = (id) => {
        setSelectedAllergens((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("uploading...");

        const token = localStorage.getItem("token");
        if (!token) {
            setStatus("missing token");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", description);

        formData.append("option_ids", JSON.stringify(selectedOptions));
        formData.append("allergen_ids", JSON.stringify(selectedAllergens));

        if (image) formData.append("image", image);

        try {
            const res = await fetch(`${API_BASE}/api/v1/product/add`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus(`Error: ${data.message || "failed to add product"}`);
                return;
            }

            setStatus("product added successfully");

            setName("");
            setPrice("");
            setCategory("");
            setDescription("");
            setSelectedOptions([]);
            setSelectedAllergens([]);
            setImage(null);
        } catch (err) {
            console.error(err);
            setStatus("network error");
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

                <h3>Options</h3>
                {options.length === 0 && <p>No options available</p>}
                {options.map((opt) => (
                    <label key={opt.option_id} style={{ display: "block" }}>
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(opt.option_id)}
                            onChange={() => toggleOption(opt.option_id)}
                        />
                        {opt.name} — {opt.description}
                    </label>
                ))}

                <h3>Allergens</h3>
                {allergens.length === 0 && <p>No allergens available</p>}
                {allergens.map((all) => (
                    <label key={all.allergen_id} style={{ display: "block" }}>
                        <input
                            type="checkbox"
                            checked={selectedAllergens.includes(
                                all.allergen_id
                            )}
                            onChange={() => toggleAllergen(all.allergen_id)}
                        />
                        {all.allergen_name}
                    </label>
                ))}

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

export default AdminAddProduct;
