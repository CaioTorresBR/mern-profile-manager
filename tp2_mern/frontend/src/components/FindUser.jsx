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
		fetchUser();
	}, [userId]);

	// fetches user data from the backend using the userId and updates the user state with the response
	// if the user is not found, it sets an error message.
	const fetchUser = async () => {
		const response = await fetch(`${API}/users/${userId}`);
		const data = await response.json();

		if (response.ok) {
			// if response is ok, set the user state with the data and clear any previous messages
			setUser(data);
			setMessage("");
			// set the form fields with the user data
			setUsername(data.username);
			setEmail(data.email);
		} else {
			setUser(null);
			setMessage("User not found");
		}
	};

	const handleEdit = async (e) => {
		// Prevent the default form submission behavior
		e.preventDefault();

		// send a PUT request to the backend to update the user data with the form fields
		const response = await fetch(`${API}/users/${userId}`, {
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
		} else {
			// if response is not ok, set message to the error message
			setMessage("Error: Failed to update user " + data.message);
		}
	};

	// if user state is null, sends back a message
	if (user == null) {
		return <div className="alert alert-danger">{message}</div>;
	}

	return (
		<div className="container">
			{/* Display User Mode */}
			{!editMode && (
				<div>
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
			)}

			{/* Edit User Mode */}
			{editMode && (
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

			{/* if there is a message, display it in an alert box */}
			{message && <div className="alert alert-info mt-3">{message}</div>}
		</div>
	);
};

export default FindUser;
