import { Link } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useCartContext } from "../contexts/CartContext";
import "./Navbar.css";

export default function Navbar() {
    const { user } = useContext(AuthContext);
    const { cart = [], toggleCart } = useCartContext() || {};
    const cartCount = Array.isArray(cart)
        ? cart.filter((i) => i !== null).length
        : 0;
    const handleToggleCart = () => toggleCart && toggleCart();

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const toggleRef = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            // Keep menu open when clicking the toggle button or inside the menu
            if (
                (menuRef.current && menuRef.current.contains(e.target)) ||
                (toggleRef.current && toggleRef.current.contains(e.target))
            ) {
                return;
            }
            setMenuOpen(false);
        };
        const onEsc = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        document.addEventListener("click", onDocClick);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("click", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="nav-left">
                <button
                    ref={toggleRef}
                    aria-expanded={menuOpen}
                    aria-label="Open menu"
                    onClick={() => setMenuOpen((s) => !s)}
                    className="menu-toggle"
                >
                    <span className="menu-line" />
                    <span className="menu-line" />
                    <span className="menu-line" />
                </button>
            </div>

            <div className="nav-actions">
                {!user && (
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                )}

                {!user && (
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                )}

                {user && (
                    <Link to="/logout">
                        <button>Logout</button>
                    </Link>
                )}

                <button
                    onClick={handleToggleCart}
                    aria-label={`Shopping cart (${cartCount})`}
                >
                    Cart ({cartCount})
                </button>
            </div>

            {menuOpen && (
                <div
                    ref={menuRef}
                    role="menu"
                    aria-label="Main menu"
                    className="menu-dropdown"
                >
                    <ul className="menu-list">
                        <li role="none">
                            <Link
                                role="menuitem"
                                to="/menu"
                                onClick={() => setMenuOpen(false)}
                            >
                                Menu
                            </Link>
                        </li>

                        {user?.role === "user" && (
                            <li role="none">
                                <Link
                                    role="menuitem"
                                    to="/orders"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    My Orders
                                </Link>
                            </li>
                        )}

                        {user?.role === "admin" && (
                            <>
                                <li role="none">
                                    <Link
                                        role="menuitem"
                                        to="/admin/add-product"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Add Product
                                    </Link>
                                </li>
                                <li role="none">
                                    <Link
                                        role="menuitem"
                                        to="/admin/manage-products"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Modify/Delete Product
                                    </Link>
                                </li>
                                <li role="none">
                                    <Link
                                        role="menuitem"
                                        to="/admin/orders"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Orders
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}
