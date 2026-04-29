import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

function Login({ onLogin }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

        // Fetch
		try {
			const res = await fetch(`${API}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Login failed");
			}

			// Save token and user
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));

			setMessage("");

			// Send user to App.jsx
			onLogin(data.user);

		} catch (error) {
			setMessage(error.message);
		}
	};

	return (
		<div className="card p-3 mt-4" style={{ maxWidth: "400px" }}>
			<h3>Login</h3>

			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Email"
					className="form-control mb-2"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<input
					type="password"
					placeholder="Password"
					className="form-control mb-2"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<button className="btn btn-primary w-100">Login</button>
			</form>

			{message && <div className="alert alert-danger mt-2">{message}</div>}
		</div>
	);
}

export default Login;