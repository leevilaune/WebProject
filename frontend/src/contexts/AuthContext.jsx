import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    loginRequest,
    getUserFromToken,
    registerRequest,
} from "../services/authService";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (credentials) => {
        try {
            const response = await loginRequest(credentials);

            localStorage.setItem("token", response.token);
            setUser(response.user);

            if (response.user.role === "admin") {
                navigate("/admin/add-product");
            } else {
                navigate("/menu");
            }
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate("/login");
    };

    const handleRegister = async (formData) => {
        try {
            const response = await registerRequest(formData);

            console.log("User registered:", response);

            navigate("/login");
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleAutoLogin = async () => {
        const token = localStorage.getItem("token");

        try {
            if (token) {
                const fetchedUser = await getUserFromToken(token);
                setUser(fetchedUser.user);
            }
            navigate(location.pathname);
        } catch (error) {
            console.error(error.message);
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const autoLogin = async () => {
            await handleAutoLogin();
        };

        autoLogin();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                user,
                handleLogin,
                handleLogout,
                handleRegister,
                handleAutoLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
