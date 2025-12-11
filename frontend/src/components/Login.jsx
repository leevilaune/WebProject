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
        <div style={{ maxWidth: 420, margin: "2rem auto" }}>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: 8 }}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: 8 }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%" }}
                    />
                </div>

                {error && (
                    <div style={{ color: "red", marginBottom: 8 }}>{error}</div>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
