import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import { API_BASE } from "../config/api";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [userName, setUserName] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userAddress, setUserAddress] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUserAndOrders = async () => {
            if (!token) {
                setError("please log in");
                setLoading(false);
                return;
            }

            try {
                const userRes = await fetch(`${API_BASE}/api/v1/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!userRes.ok) throw new Error("failed to fetch user");
                const userData = await userRes.json();

                const userId = userData?.user?.user_id;

                const userInfo = await fetch(
                    `${API_BASE}/api/v1/user/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (!userInfo.ok) throw new Error("failed to fetch user info");
                const userInfoData = await userInfo.json();

                setUserName(userInfoData.username);
                setUserRole(userInfoData.role);
                setUserEmail(userInfoData.email);
                setUserPhone(userInfoData.phone_number);
                setUserAddress(userInfoData.address);

                const ordersRes = await fetch(
                    `${API_BASE}/api/v1/order/byuser/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (!ordersRes.ok) throw new Error("failed to fetch orders");

                const ordersData = await ordersRes.json();

                const sorted = Array.isArray(ordersData)
                    ? [...ordersData].sort((a, b) => b.timestamp - a.timestamp)
                    : [];

                setOrders(sorted);
            } catch (err) {
                console.error(err);
                setError("failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndOrders();
    }, [token]);

    if (!token) return <p>log in to see your orders</p>;
    if (loading) return <p>loading your orders...</p>;
    if (error) return <p>{error}</p>;
    if (orders.length === 0) return <p>no orders found.</p>;

    return (
        <div>
            <h2>My Orders</h2>
            <div>
                {userName && (
                    <p>
                        <strong>username:</strong> {userName}
                    </p>
                )}
                {userEmail && (
                    <p>
                        <strong>email:</strong> {userEmail}
                    </p>
                )}
                {userPhone && (
                    <p>
                        <strong>phone:</strong> {userPhone}
                    </p>
                )}
                {userAddress && (
                    <p>
                        <strong>address:</strong> {userAddress}
                    </p>
                )}
                {userRole && (
                    <p>
                        <strong>role:</strong> {userRole}
                    </p>
                )}
                <br />
            </div>

            <div>
                {orders.map((order, index) => (
                    <React.Fragment key={order.order_number}>
                        <OrderItem order={order} />
                        {index < orders.length - 1 && (
                            <div>
                                <p colSpan="6">
                                    <hr />
                                </p>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Orders;
