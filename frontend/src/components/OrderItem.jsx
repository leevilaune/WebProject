import React from "react";
import getImageUrl from "../utils/getImageUrl";
import formatTimestamp from "../utils/formatTimestamp";

const OrderItem = ({ order }) => {
    const renderProducts = () =>
        order.products.map((prod) => (
            <div
                key={prod.product_id}
                style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}
            >
                <img
                    style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                    }}
                    src={getImageUrl(prod.image_url)}
                    alt={prod.name}
                    onError={(e) => (e.target.style.display = "none")}
                />
                <div>
                    <strong>{prod.name}</strong> (€{prod.price.toFixed(2)})
                    <br />
                    <em>{prod.category}</em>
                    <br />
                    {prod.description && (
                        <span>
                            {prod.description}
                            <br />
                        </span>
                    )}
                    {prod.options && prod.options.length > 0 && (
                        <div>
                            <strong>Options:</strong>
                            <ul
                                style={{
                                    margin: "0.25rem 0",
                                    paddingLeft: "1rem",
                                }}
                            >
                                {prod.options.map((opt) => (
                                    <li key={opt.option_id}>{opt.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        ));

    return (
        <div>
            <p className="status-cap">
                <strong>Status:</strong> {order.status}
            </p>
            <p>
                <strong>Address:</strong> {order.delivery_address}
            </p>
            <p>
                <strong>Price:</strong> {order.price.toFixed(2)}€
            </p>
            <p>
                <strong>Timestamp:</strong> {formatTimestamp(order.timestamp)}
            </p>
            <br />
            <div>{renderProducts()}</div>
        </div>
    );
};

export default OrderItem;
