import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
            <Link to="/menu">Menu</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/admin/add-product">Add Product</Link>
            <Link to="/admin/manage-products">Modify/Delete Product</Link>
            <Link to="/admin/orders">Orders</Link>
            <Link to="/logout">Logout</Link>
        </nav>
    );
}
