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
        <div id="register-container">
            <h2>Register</h2>
            <form id="register-form" onSubmit={onSubmit}>
                <div id="register-field-username">
                    <label htmlFor="register-username">Username</label>
                    <input
                        id="register-username"
                        name="username"
                        value={form.username}
                        onChange={onChange}
                        required
                    />
                </div>

                <div id="register-field-email">
                    <label htmlFor="register-email">Email</label>
                    <input
                        id="register-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        required
                    />
                </div>

                <div id="register-field-password">
                    <label htmlFor="register-password">Password</label>
                    <input
                        id="register-password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={onChange}
                        required
                    />
                </div>

                <div id="register-field-confirmPassword">
                    <label htmlFor="register-confirmPassword">
                        Confirm password
                    </label>
                    <input
                        id="register-confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={onChange}
                        required
                    />
                </div>

                <div id="register-field-phone_number">
                    <label htmlFor="register-phone_number">Phone number</label>
                    <input
                        id="register-phone_number"
                        name="phone_number"
                        value={form.phone_number}
                        onChange={onChange}
                    />
                </div>

                <div id="register-field-address">
                    <label htmlFor="register-address">Address</label>
                    <input
                        id="register-address"
                        name="address"
                        value={form.address}
                        onChange={onChange}
                    />
                </div>

                {error && <div id="register-error">{error}</div>}

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}
