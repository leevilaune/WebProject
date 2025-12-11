import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
    const { handleLogin } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await handleLogin({ username, password });
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="login-container">
            <h2>Login</h2>
            <form id="login-form" onSubmit={onSubmit}>
                <div id="login-field-username">
                    <label htmlFor="login-username">Username</label>
                    <input
                        id="login-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div id="login-field-password">
                    <label htmlFor="login-password">Password</label>
                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <div id="login-error">{error}</div>}

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
