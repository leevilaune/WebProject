import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Register() {
    const { handleRegister } = useContext(AuthContext);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone_number: "",
        address: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const payload = {
            username: form.username,
            email: form.email,
            password: form.password,
            phone_number: form.phone_number,
            address: form.address,
        };

        setLoading(true);
        try {
            await handleRegister(payload);
        } catch (err) {
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 560, margin: "2rem auto" }}>
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: 8 }}>
                    <label>Username</label>
                    <input
                        name="username"
                        value={form.username}
                        onChange={onChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: 8 }}>
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: 8 }}>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={onChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: 8 }}>
                    <label>Confirm password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={onChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: 8 }}>
                    <label>Phone number</label>
                    <input
                        name="phone_number"
                        value={form.phone_number}
                        onChange={onChange}
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: 8 }}>
                    <label>Address</label>
                    <input
                        name="address"
                        value={form.address}
                        onChange={onChange}
                        style={{ width: "100%" }}
                    />
                </div>

                {error && (
                    <div style={{ color: "red", marginBottom: 8 }}>{error}</div>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}
