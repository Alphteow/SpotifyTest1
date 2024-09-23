import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

const SPOTIFY_CLIENT_ID = "3dd5ac2ac81e46679663572c2de294fe";  // Replace with your Spotify Client ID
const SPOTIFY_REDIRECT_URI = "http://127.0.0.1:8000";  // Update with your callback URI
const SCOPES = [
    "user-read-email",
    "user-read-private",
    "playlist-read-private",
    "user-library-read",
].join("%20");

const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${SCOPES}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`;

function LoginForm({ route }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/"); // Navigate to the home page after login
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Spotify login redirection
    const handleSpotifyLogin = () => {
        window.location.href = SPOTIFY_AUTH_URL;  // Redirect to Spotify authorization page
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {loading && <LoadingIndicator />}
                <button className="form-button" type="submit">
                    Login
                </button>
            </form>

            {/* Spotify login button */}
            <div className="spotify-login">
                <p>Or login using Spotify:</p>
                <button
                    className="spotify-button"
                    onClick={handleSpotifyLogin}
                >
                    Login with Spotify
                </button>
            </div>

            {/* Button to navigate to the Register page */}
            <div className="register-link">
                <p>Don't have an account?</p>
                <Link to="/register">
                    <button className="form-button">Register</button>
                </Link>
            </div>
        </div>
    );
}

export default LoginForm;
