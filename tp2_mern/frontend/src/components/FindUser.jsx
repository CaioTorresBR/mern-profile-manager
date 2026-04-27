import { useState, useEffect } from "react";

/** Inspired by MERN Demo code*/
const API = import.meta.env.VITE_API_URL;

const FindUser = ({ userId }) => {
	// form fields
	const [editMode, setEditMode] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// user data and message
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState("");

	// load user using fetchUser() first time and every time userId changes
	useEffect(() => {
		// fetches user data from the backend using the userId and updates the user state with the response
		// if the user is not found, it sets an error message.
		const fetchUser = async () => {
			if (!userId) {
				return;
			}

			const response = await fetch(`${API}/profils/${userId}`);
			const data = await response.json();

			if (response.ok) {
				// if response is ok, set the user state with the data and clear any previous messages
				setUser(data);
				setMessage("");
				setUsername(data.username || "");
				setEmail(data.email || "");
			} else {
				setUser(null);
				setMessage("User not found");
			}
		};

		fetchUser();
	}, [userId]);



	const handleEdit = async (e) => {
		// Prevent the default form submission behavior
		e.preventDefault();

		// send a PUT request to the backend to update the user data with the form fields
		const response = await fetch(`${API}/profils/${userId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, email, password }),
		});

		// response is stored inside data variable
		const data = await response.json();
		//
		if (response.ok) {
			setMessage("User updated successfully");
			setUser(data);
			setEditMode(false);

			// Clear the password field and update username and email with the response data
			setPassword("");
			setUsername(data.username || "");
			setEmail(data.email || "");
		} else {
			// if response is not ok, set message to the error message
			setMessage("Error: Failed to update user " + data.message);
		}
	};

	return (
		<div className="container">

			{!user ? (
				<div className="alert alert-warning mt-3">Loading user data.</div>
			)
			: 
			(
			<>
			{/* Display User Mode */}
			{!editMode ? (
				<div className="card p-3 mt-5">
					<h2>User Details</h2>
					<p>
						<strong>Username:</strong> {user.username}
					</p>
					<p>
						<strong>Email:</strong> {user.email}
					</p>
					<>
						{/* Edit Button (switch to edit mode) */}
						<button
							className="btn btn-secondary"
							onClick={() => setEditMode(true)}
						>
							Edit
						</button>
					</>
				</div>
			) : (
			/* Edit User Mode */
				<form onSubmit={handleEdit}>
					{/* edit username */}
					<label>Username</label>
					<input
						value={username}
						className="form-control"
						onChange={(e) => setUsername(e.target.value)}
					></input>
					{/* edit email */}
					<label>Email</label>
					<input
						value={email}
						className="form-control"
						onChange={(e) => setEmail(e.target.value)}
					></input>
					{/* edit password */}
					<label>New Password</label>
					<input
						type="password"
						value={password}
						className="form-control"
						onChange={(e) => setPassword(e.target.value)}
					></input>

					{/*Buttons */}
					<div>
						<button type="submit" className="btn btn-primary mt-2">
							Save changes
						</button>
						<button
							type="button"
							className="btn btn-secondary mt-2 ml-2"
							onClick={() => setEditMode(false)}
						>
							Cancel
						</button>
					</div>
				</form>
			)}
			</>
		)}
			{/* if there is a message and the user exists, display it in an alert box */}
			{ message && user && (
				<div className="alert alert-info mt-3">{message}</div>
		)}
		</div>
	);
};

export default FindUser;
