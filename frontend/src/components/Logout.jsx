import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Logout() {
    const { handleLogout } = useContext(AuthContext);

    useEffect(() => {
        handleLogout();
    }, []); // run once on mount

    return <p>Logging out...</p>;
}
