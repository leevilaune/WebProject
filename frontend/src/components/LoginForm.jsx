import React, { useState } from "react";

const LoginForm = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Logging in...");

        try {
            const res = await fetch(
                "https://test.onesnzeroes.dev/api/v1/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setStatus(`Error: ${data.message || "Login failed"}`);
                return;
            }

            if (data.token) {
                localStorage.setItem("authToken", data.token);
                setIsLoggedIn(true);
            }
            console.log(res);

            setStatus("Login successful!");
        } catch (err) {
            console.error(err);
            setStatus("Network error");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default LoginForm;
