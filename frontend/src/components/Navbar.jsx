import { Link } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useCartContext } from "../contexts/CartContext";

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
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.5rem 1rem",
                position: "sticky",
                top: 0,
                background: "#fff",
                zIndex: 1000,
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button
                    ref={toggleRef}
                    aria-expanded={menuOpen}
                    aria-label="Open menu"
                    onClick={() => setMenuOpen((s) => !s)}
                    style={{
                        display: "inline-flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "3px",
                        padding: "6px",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                    }}
                >
                    <span
                        style={{
                            width: 18,
                            height: 2,
                            background: "#111",
                            display: "block",
                        }}
                    />
                    <span
                        style={{
                            width: 18,
                            height: 2,
                            background: "#111",
                            display: "block",
                        }}
                    />
                    <span
                        style={{
                            width: 18,
                            height: 2,
                            background: "#111",
                            display: "block",
                        }}
                    />
                </button>
            </div>

            <div
                style={{
                    marginLeft: "auto",
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                }}
            >
                {!user && (
                    <Link to="/login">
                        <button style={{ padding: "0.4rem 0.6rem" }}>
                            Login
                        </button>
                    </Link>
                )}

                {!user && (
                    <Link to="/register">
                        <button style={{ padding: "0.4rem 0.6rem" }}>
                            Register
                        </button>
                    </Link>
                )}

                {user && (
                    <Link to="/logout">
                        <button style={{ padding: "0.4rem 0.6rem" }}>
                            Logout
                        </button>
                    </Link>
                )}

                <button
                    onClick={handleToggleCart}
                    aria-label={`Shopping cart (${cartCount})`}
                    style={{ padding: "0.4rem 0.6rem" }}
                >
                    Cart ({cartCount})
                </button>
            </div>

            {menuOpen && (
                <div
                    ref={menuRef}
                    role="menu"
                    aria-label="Main menu"
                    style={{
                        position: "absolute",
                        top: "56px",
                        left: "8px",
                        background: "#fff",
                        border: "1px solid rgba(0,0,0,0.08)",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                        padding: "0.5rem",
                        borderRadius: 6,
                        minWidth: 180,
                        zIndex: 1100,
                    }}
                >
                    <ul
                        style={{
                            listStyle: "none",
                            margin: 0,
                            padding: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.25rem",
                        }}
                    >
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
