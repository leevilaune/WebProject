import React from "react";
import getImageUrl from "../utils/getImageUrl";
import formatTimestamp from "../utils/formatTimestamp";

const OrderItem = ({ order }) => {
    const renderProducts = () =>
        order.products.map((prod) => (
            <div key={prod.product_id} className="product-row">
                <img
                    className="product-img"
                    src={getImageUrl(prod.image_url)}
                    alt={prod.name}
                    onError={(e) => (e.target.style.display = "none")}
                />
                <div>
                    <strong>{prod.name}</strong> (${prod.price.toFixed(2)})
                    <br />
                    <em>{prod.category}</em>
                    <br />
                    {prod.description}
                </div>
            </div>
        ));

    return (
        <tr>
            <td>{order.order_number}</td>
            <td className="status-cap">{order.status}</td>
            <td>{order.delivery_address}</td>
            <td>${order.price.toFixed(2)}</td>
            <td>{formatTimestamp(order.timestamp)}</td>
            <td>{renderProducts()}</td>
        </tr>
    );
};

export default OrderItem;
