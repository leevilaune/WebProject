import React, { useState } from "react";
import ModifyProductDialog from "./ModifyProductDialog";
import getImageUrl from "../utils/getImageUrl";

const AdminProductCard = ({ product, onDelete, onModify }) => {
    const [showModify, setShowModify] = useState(false);

    const allergens = Array.isArray(product.allergens) ? product.allergens : [];

    return (
        <div>
            <img
                src={getImageUrl(product.image_url)}
                alt={product.name}
                onError={(e) => (e.target.style.display = "none")}
            />
            <h2>{product.name}</h2>
            <p>
                <strong>Price:</strong> €{product.price.toFixed(2)}
            </p>
            <p>
                <strong>Category:</strong> {product.category}
            </p>
            <p>{product.description}</p>

            {product.options?.length > 0 && (
                <div>
                    <strong>Options:</strong>
                    <ul>
                        {product.options.map((o) => (
                            <li key={o.option_id}>
                                {o.name} - {o.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {allergens.length > 0 && (
                <div>
                    <strong>Allergens:</strong>
                    <div>
                        {allergens.map((a) => (
                            <div key={a.allergen_id}>
                                <img
                                    src={getImageUrl(a.allergen_icon_url)}
                                    alt={a.allergen_name}
                                    onError={(e) =>
                                        (e.target.style.display = "none")
                                    }
                                />
                                <span>{a.allergen_name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <button onClick={() => setShowModify(true)}>Modify</button>
                <button onClick={() => onDelete(product.product_id)}>
                    Delete
                </button>
            </div>

            {showModify && (
                <ModifyProductDialog
                    product={product}
                    onClose={() => setShowModify(false)}
                    onSave={onModify}
                />
            )}
        </div>
    );
};

export default AdminProductCard;
