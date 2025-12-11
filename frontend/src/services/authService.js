import { API_BASE } from "../config/api";

export const loginRequest = async (credentials) => {
    const response = await fetch(`${API_BASE}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    return data;
};

export const getUserFromToken = async (token) => {
    const response = await fetch(`${API_BASE}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Invalid token");

    return data;
};

export const registerRequest = async (formData) => {
    const response = await fetch(`${API_BASE}/api/v1/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Registration failed");

    return data;
};
