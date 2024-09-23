import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"; // Spotify token endpoint
const SPOTIFY_API_URL = "https://api.spotify.com/v1"; // Spotify API base URL

// Create an instance of Axios for the Spotify API
const spotifyApi = axios.create({
  baseURL: SPOTIFY_API_URL,
});

/* Intercept every request to check if a token is available */
spotifyApi.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      // Handle case where the token is not present
      throw new Error("No access token available.");
    }

    // Add Authorization header with Bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* Handle token refreshing logic if necessary */
const refreshSpotifyToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);
  params.append("client_id", "your_spotify_client_id"); // Replace with your actual Spotify client ID
  params.append("client_secret", "your_spotify_client_secret"); // Replace with your actual Spotify client secret

  try {
    const response = await axios.post(SPOTIFY_TOKEN_URL, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Update localStorage with new access token
    localStorage.setItem(ACCESS_TOKEN, response.data.access_token);

    if (response.data.refresh_token) {
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
    }
  } catch (error) {
    console.error("Error refreshing Spotify token:", error);
    throw error;
  }
};

export { spotifyApi, refreshSpotifyToken };




// import axios from "axios";
// import { ACCESS_TOKEN } from "./constants";

// const apiUrl = "/choreo-apis/spotifytest1/backend/v1";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
// });

// /*looking to see if there is a token available */
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api; //can use this api instead of using axios 