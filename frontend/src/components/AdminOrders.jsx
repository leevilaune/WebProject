import React, { useEffect, useState } from "react";
import AdminOrderItem from "./AdminOrderItem";
import { API_BASE } from "../config/api";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);

            try {
                const res = await fetch(`${API_BASE}/api/v1/order/all`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                });

                let data = await res.json();
                if (!Array.isArray(data)) data = [];

                data.sort((a, b) => b.timestamp - a.timestamp);

                setOrders(data);
            } catch (err) {
                console.error("failed to fetch orders:", err);
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
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan="8">no orders found</td>
                    </tr>
                ) : (
                    orders.map((order) => (
                        <AdminOrderItem
                            key={order.order_number}
                            order={order}
                        />
                    ))
                )}
            </tbody>
        </table>
    );
};

export default AdminOrders;
