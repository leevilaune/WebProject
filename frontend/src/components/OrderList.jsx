import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    "https://test.onesnzeroes.dev/api/v1/order/all",
                    {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : "",
                        },
                    }
                );
                const data = await res.json();
                setOrders(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("dailed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    if (!token) return <p>log in to see orders</p>;
    if (loading) return <p>loading orders...</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>Order #</th>
                    <th>Delivery Address</th>
                    <th>Price</th>
                    <th>Timestamp</th>
                    <th>User ID</th>
                    <th>Products</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan="7">no orders found</td>
                    </tr>
                ) : (
                    orders.map((order) => (
                        <OrderItem key={order.order_number} order={order} />
                    ))
                )}
            </tbody>
        </table>
    );
};

export default OrderList;
