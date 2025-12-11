import React, { useState } from "react";
import getImageUrl from "../utils/getImageUrl";
import formatTimestamp from "../utils/formatTimestamp";
import { API_BASE } from "../config/api";

const AdminOrderItem = ({ order, onDelete, onModify }) => {
    const [editing, setEditing] = useState(false);
    const [newAddress, setNewAddress] = useState(order.delivery_address);
    const [status, setStatus] = useState(order.status || "received");
    const [statusMessage, setStatusMessage] = useState("");

    const token = localStorage.getItem("token");

    const handleDelete = async () => {
        if (!token) return alert("Login first!");

        if (!window.confirm("Are you sure you want to delete this order?"))
            return;

        try {
            const res = await fetch(
                `${API_BASE}/api/v1/order/${order.order_number}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!res.ok) throw new Error("Delete failed");

            onDelete(order.order_number);
            setStatusMessage("Deleted successfully");
        } catch (err) {
            console.error(err);
            setStatusMessage("Delete failed");
        }
    };

    const handleModify = async () => {
        if (!token) return alert("Login first!");

        try {
            const res = await fetch(
                `${API_BASE}/api/v1/order/${order.order_number}`,
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

            onModify(order.order_number, { delivery_address: newAddress });
            setStatusMessage("Modified successfully");
            setEditing(false);
        } catch (err) {
            console.error(err);
            setStatusMessage("Modify failed");
        }
    };

    const handleStatusUpdate = async () => {
        if (!token) return alert("Login first!");

        try {
            const res = await fetch(
                `${API_BASE}/api/v1/order/status/${order.order_number}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                }
            );

            if (!res.ok) throw new Error("Status update failed");

            onModify(order.order_number, { status });
            setStatusMessage("Status updated");
        } catch (err) {
            console.error(err);
            setStatusMessage("Status update failed");
        }
    };

    const renderProducts = () =>
        order.products.map((prod) => (
            <div key={prod.product_id} className="product-item">
                <img
                    style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                    }}
                    src={getImageUrl(prod.image_url)}
                    alt={prod.name}
                    className="product-img"
                    onError={(e) => (e.target.style.display = "none")}
                />
                <div className="product-details">
                    <strong>{prod.name}</strong> (€{prod.price.toFixed(2)})
                    <br />
                    <em>{prod.category}</em>
                    <br />
                    {prod.description}
                    {prod.options?.length > 0 && (
                        <div className="product-options">
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
                        <div className="product-allergens">
                            <strong>Allergens:</strong>
                            {prod.allergens.map((a) => (
                                <span
                                    key={a.allergen_id}
                                    q
                                    className="allergen-item"
                                >
                                    <img
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "cover",
                                        }}
                                        src={getImageUrl(a.allergen_icon_url)}
                                        alt={a.allergen_name}
                                        className="allergen-img"
                                    />
                                    {a.allergen_name}
                                </span>
                            ))}
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

            <td>€{order.price.toFixed(2)}</td>

            <td>{formatTimestamp(order.timestamp)}</td>

            <td>{order.user_id}</td>

            <td>{renderProducts()}</td>

            <td>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="received">Received</option>
                    <option value="preparing">Preparing</option>
                    <option value="completed">Completed</option>
                </select>

                <button onClick={handleStatusUpdate}>Update</button>

                {statusMessage && (
                    <div className="status-message">{statusMessage}</div>
                )}
            </td>

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
            </td>
        </tr>
    );
};

export default AdminOrderItem;
