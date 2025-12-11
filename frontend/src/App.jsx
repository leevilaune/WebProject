import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import PaymentView from "./components/PaymentView";
import Home from "./views/Home";
import Orders from "./components/Orders";
import AdminAddProduct from "./components/AdminAddProduct";
import AdminEditProduct from "./components/AdminEditProduct";
import AdminOrders from "./components/AdminOrders";
import ShoppingCart from "./components/ShoppingCart";
import { useCart } from "./hooks/useCart";
import { CartContext } from "./contexts/CartContext";

export default function App() {
    // Use an inner component so we can call hooks like `useNavigate`
    const InnerApp = () => {
        const cartApi = useCart();
        const navigate = useNavigate();
        const goToPayment = () => navigate("/payment");

        return (
            <CartContext.Provider value={cartApi}>
                <Navbar />
                <ShoppingCart
                    cart={cartApi.cart}
                    showCart={cartApi.showCart}
                    toggleCart={cartApi.toggleCart}
                    goToPayment={goToPayment}
                    removeFromCart={cartApi.removeFromCart}
                />

                <Routes>
                    <Route path="/menu" element={<Home />} />
                    <Route path="/payment" element={<PaymentView />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />

                    <Route>
                        <Route path="/orders" element={<Orders />} />
                    </Route>

                    <Route>
                        <Route
                            path="/admin/add-product"
                            element={<AdminAddProduct />}
                        />
                        <Route
                            path="/admin/manage-products"
                            element={<AdminEditProduct />}
                        />
                        <Route path="/admin/orders" element={<AdminOrders />} />
                    </Route>

                    <Route path="*" element={<Home />} />
                </Routes>
            </CartContext.Provider>
        );
    };

    return (
        <BrowserRouter>
            <AuthProvider>
                <InnerApp />
            </AuthProvider>
        </BrowserRouter>
    );
}
