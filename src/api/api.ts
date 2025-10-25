import axios from "axios";
export const API = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
});

API.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem("access_token");

		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Handle global errors
		if (error.response) {
			const { status } = error.response;

			if (status === 401) {
				// Optionally redirect to login
				console.warn("Unauthorized. Redirecting to login.");
			} else if (status === 500) {
				console.error("Server error.");
			}
		}

		return Promise.reject(error);
	}
);

export default API;
