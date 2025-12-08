import React, { useState } from "react";
import LoginForm from "./components/LoginForm.jsx";
import AddProductForm from "./components/AddProductForm.jsx";
import ProductList from "./components/ProductList.jsx";
import OrderList from "./components/OrderList.jsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("authToken")
    ); //bad code because i never logout.

    return (
        <>
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn && (
                <>
                    <AddProductForm />
                    <ProductList />
                    <OrderList></OrderList>
                </>
            )}
        </>
    );
}

export default App;
