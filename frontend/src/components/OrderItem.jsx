import React, { useState } from "react";

const OrderItem = ({ order }) => {
    const [editing, setEditing] = useState(false);
    const [newAddress, setNewAddress] = useState(order.delivery_address);
    const [status, setStatus] = useState("");

    const token = localStorage.getItem("authToken");

    const formatTimestamp = (ts) => {
        if (!ts) return "-";
        const date = new Date(ts * 1000);
        return date.toLocaleString();
    };

    const handleDelete = async () => {
        if (!token) {
            alert("Login first!");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this order?"))
            return;

        try {
            const res = await fetch(
                `https://test.onesnzeroes.dev/api/v1/order/${order.order_number}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (!res.ok) throw new Error("Delete failed");
            setStatus("Deleted successfully");
        } catch (err) {
            console.error(err);
            setStatus("Delete failed");
        }
    };

    const handleModify = async () => {
        if (!token) {
            alert("Login first!");
            return;
        }
        try {
            const res = await fetch(
                `https://test.onesnzeroes.dev/api/v1/order/${order.order_number}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ delivery_address: newAddress }),
                }
            );
            if (!res.ok) throw new Error("Modify failed");
            setStatus("Modified successfully");
            setEditing(false);
        } catch (err) {
            console.error(err);
            setStatus("Modify failed");
        }
    };

    const renderProducts = () =>
        order.products.map((prod) => (
            <div key={prod.product_id}>
                <img
                    src={prod.image_url || ""}
                    alt={prod.name}
                    onError={(e) => (e.target.style.display = "none")}
                />
                <div>
                    <strong>{prod.name}</strong> (${prod.price.toFixed(2)})
                    <br />
                    <em>{prod.category}</em>
                    <br />
                    {prod.description}
                    <br />
                    {prod.options?.length > 0 && (
                        <div>
                            <strong>Options:</strong>
                            <ul>
                                {prod.options.map((opt) => (
                                    <li key={opt.option_id}>
                                        {opt.name} - {opt.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {prod.allergens?.length > 0 && (
                        <div>
                            <strong>Allergens:</strong>
                            <div>
                                {prod.allergens.map((a) => (
                                    <div key={a.allergen_id}>
                                        <img
                                            src={a.allergen_icon_url}
                                            alt={a.allergen_name}
                                            onError={(e) =>
                                                (e.target.style.display =
                                                    "none")
                                            }
                                        />
                                        <span>{a.allergen_name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        ));

    return (
        <tr>
            <td>{order.order_number}</td>
            <td>
                {editing ? (
                    <input
                        type="text"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                    />
                ) : (
                    order.delivery_address
                )}
            </td>
            <td>${order.price.toFixed(2)}</td>
            <td>{formatTimestamp(order.timestamp)}</td>
            <td>{order.user_id}</td>
            <td>{renderProducts()}</td>
            <td>
                {editing ? (
                    <>
                        <button onClick={handleModify}>Save</button>
                        <button
                            onClick={() => {
                                setEditing(false);
                                setNewAddress(order.delivery_address);
                            }}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setEditing(true)}>Modify</button>
                        <button onClick={handleDelete}>Delete</button>
                    </>
                )}
                {status && <div>{status}</div>}
            </td>
        </tr>
    );
};

export default OrderItem;
