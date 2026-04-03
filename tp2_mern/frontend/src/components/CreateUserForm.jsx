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
		// Form: saisir un pseudo, un courriel et un mot de passe
		<div className="container">
			{/* Username input */}
			<div className="form-group">
				<label for="username">Username:</label>
				<input  
                    type="text" className="form-control" id="username" value={form.username} onChange={handleChange} required/>
			</div>
			{/* Email input */}
			<div className="form-group">
				<label for="email">Email:</label>
				<input type="email" className="form-control" id="email" value={form.email} onChange={handleChange} required/>
			</div>
			{/* Password input */}
			<div className="form-group">
				<label for="password">Password:</label>
				<input type="password" className="form-control" id="pwd" value={form.password} onChange={handleChange} required/>

				{/* Button to generate a random password 
                    
                    IMPLEMENTAR:
                    
                    */}
				<button type="random-pwd" className="btn btn-secondary mt-2">
					Generate random password
				</button>
			</div>
			<div className="checkbox">
				<label>
					<input type="checkbox" /> Administrator Account
				</label>
			</div>

			{/* Submit button */}
			<button type="submit" className="btn btn-primary mt-3">
				Create user
			</button>
		</div>
	);
}

export default CreateUserForm;
