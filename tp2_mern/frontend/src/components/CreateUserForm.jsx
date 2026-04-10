// inspired by mern demo
import { useState } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Creates a form to create a user with the following fields: username, email and password.
function CreateUserForm() {

    // useStates hooks to store the values of the inputs
	const [form, setForm] = useState({
		username : '',
		email : '',
		password : '',
	})
	// hooks to store the created user and the message to display
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState("");

	// handleChange function to update the form state when the user types in the inputs
    const handleChange = (e) => {
			setForm({ ...form, [e.target.name]: e.target.value });
		};

	const handleSubmit = async (e) => {
		// Prevent the default form submission behavior
		e.preventDefault();

		try {
			// Send a POST request to the backend to create a new user with the form data
			const res = await fetch(`${import.meta.env.VITE_API_URL}/users`,{
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(form),
			});

			// response is stored inside data variable
			const data = await res.json();

			// throws error if response is not ok
			if (!res.ok) {
				throw new Error(data.message || 'Failed to create user');
			}

			// if user's created, sets the message with it's ID or with the message from the response
			setMessage(data.message || `User created successfully with ID: ${data.userId}`);
			setForm({ username: '', email: '', password: '' }); // clears the form


		} catch(error){
			// If there is an error, set the message state to the error message
			setMessage(error.message);
		}
	}

    function generateRandomPassword(){
        // Generate a random password of 8 characters
    }

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				{/* Username input */}
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						className="form-control"
						id="username"
						name="username"
						value={form.username}
						onChange={handleChange}
						required
					/>
				{/* Email input */}
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						required
					/>
				{/* Password input */}
				
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						className="form-control"
						id="pwd"
						name="password"
						value={form.password}
						onChange={handleChange}
						required
					/>

					{/* Button to generate a random password 
                    
                    IMPLEMENTAR:
                    
                    */}
					<button type="random-pwd" className="btn btn-secondary mt-2" onClick={generateRandomPassword}>
						Generate random password
					</button>
				
				<div className="checkbox">
					<label>
						<input type="checkbox" /> Administrator Account
					</label>
				</div>

				{/* Submit button */}
				<button type="submit" className="btn btn-primary mt-3">
					Create user
				</button>
			</form>
		</div>
	);
}

export default CreateUserForm;
