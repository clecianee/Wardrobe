import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
}
from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { auth } from "../services/firebase";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState("");
    const [isRegistering, setIsRegistering] = useState(false); // false means login; true means create account;
    const navigate = useNavigate();
 
    async function handleRegister(event) {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            setMessage("Account created successfully!");
            setEmail("");
            setPassword("");
        }
        catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setMessage("This email is already registered.");
            }
            else if (error.code === "auth/weak-password") {
                setMessage("Please choose a stronger password.");
            }
            else if (error.code === "auth/invalid-email") {
                setMessage("Please enter a valid email address.");
            }
            else {
                setMessage("Something went wrong. Please try again.");
                console.error(error);
            }
        }
        finally {
            setLoading(false);
        }
    }

    async function handleLogin(event) {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            setMessage("Login successful!");
            setPassword("");
            navigate("/home", {replace: true});
        }
        catch (error) {
            console.error(error);
            setMessage("Invalid email or password. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    async function handlePasswordReset() {
        if (!email.trim()) {
            setMessage("Please enter your email address first.");
            return;
        }

        setMessage("");
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email.trim());

            setMessage(
                "If an account exists for this email, you will receive a password reset link."
            );
        }

        catch (error) {
            console.error("Password reset error:", error);

            if (error.code === "auth/invalid-email") {
                setMessage("Please enter a valid email address.");
            }
            else if (error.code === "auth/too-many-requests") {
                setMessage("Too many attempts. Please try again later.");
            }
            else {
                setMessage("Unnable to send the reset email. Please try again.");
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Virtual Wardrobe</h1>
            <h2>{isRegistering ? "Create Account" : "Login"}</h2>

            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    minLength={6}
                    required
                    />
                    </div>

                    <button type="submit" disabled={loading}>
                    {loading
                        ? "Please wait..." 
                        : isRegistering
                        ? "Create Account"
                        : "Login"}
                    </button>
            </form>

            <p>
                {isRegistering
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>

            <button
                type="button"
                onClick={() => {
                    setIsRegistering(!isRegistering);
                    setMessage("");
                }}
            >
                {isRegistering ? "Go to Login" : "Create an Account"}
            </button>

            <p role="status">{message}</p>
        </div>
    );
}

export default Login;