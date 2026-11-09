import { signOut } from "firebase/auth";
import { useNavigate  } from "react-router-dom";
import { auth } from "../services/firebase";
import { NavLink } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await signOut(auth);
            navigate("/login", { replace: true });
        }
        catch (error) {
            console.error("Logout failed:", error);
        }
    }
    return (
        <nav>
            <h2>Virtual Wardrobe</h2>

            <div>
                <button type="button" onClick={handleLogout}>
                    Logout
                </button>
                <NavLink to="/home">Home</NavLink>
                {" | "}
                <NavLink to="/wardrobe">Wardrobe</NavLink>
                {" | "}
                <NavLink to="/outfits">Outfits</NavLink>
                {" | "}
                <NavLink to="/profile">Profile</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;