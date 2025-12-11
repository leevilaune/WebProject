import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
    const { user } = useContext(AuthContext);

    return (
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
            {user?.role !== "admin" && <Link to="/menu">Menu</Link>}
            {user?.role === "user" && <Link to="/payment">Payment</Link>}

            {!user && <Link to="/login">Login</Link>}
            {!user && <Link to="/register">Register</Link>}

            {user?.role === "user" && <Link to="/orders">My Orders</Link>}

            {user?.role === "admin" && (
                <>
                    <Link to="/admin/add-product">Add Product</Link>
                    <Link to="/admin/manage-products">
                        Modify/Delete Product
                    </Link>
                    <Link to="/admin/orders">Orders</Link>
                </>
            )}

            {user && <Link to="/logout">Logout</Link>}
        </nav>
    );
}
