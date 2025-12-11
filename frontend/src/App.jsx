import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import PaymentView from "./components/PaymentView";
import Orders from "./components/Orders";
import AdminAddProduct from "./components/AdminAddProduct";
import AdminEditProduct from "./components/AdminEditProduct";
import AdminOrders from "./components/AdminOrders";
import Menu from "./components/Menu"; // <-- import your Menu component

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />

                <Routes>
                    {/* User routes */}
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/payment" element={<PaymentView />} />
                    <Route path="/orders" element={<Orders />} />

                    {/* Auth routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />

                    {/* Admin routes */}
                    <Route
                        path="/admin/add-product"
                        element={<AdminAddProduct />}
                    />
                    <Route
                        path="/admin/manage-products"
                        element={<AdminEditProduct />}
                    />
                    <Route path="/admin/orders" element={<AdminOrders />} />

                    {/* Fallback route */}
                    <Route path="*" element={<Menu />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
