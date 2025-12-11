import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useCartContext } from "../contexts/CartContext";

export default function Navbar() {
    const { user } = useContext(AuthContext);
    const { cart = [], toggleCart } = useCartContext() || {};
    const cartCount = Array.isArray(cart)
        ? cart.filter((i) => i !== null).length
        : 0;
    const handleToggleCart = () => toggleCart && toggleCart();

    return (
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.75rem 1rem",
                position: "sticky",
                top: 0,
                background: "#fff",
                zIndex: 1000,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
        >
            <Link to="/menu">Menu</Link>

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

            <div style={{ marginLeft: "auto" }}>
                <button
                    onClick={handleToggleCart}
                    aria-label={`Shopping cart (${cartCount})`}
                    style={{ padding: "0.4rem 0.6rem" }}
                >
                    Cart ({cartCount})
                </button>
            </div>
        </nav>
    );
}
