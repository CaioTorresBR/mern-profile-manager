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
			isAdmin : false
		})
		// hooks to store the created user and the message to display
		const [user, setUser] = useState(null);
		const [message, setMessage] = useState("");

		// password length for the random password generator
		const [length, setLength] = useState(8);
		const [randomPwd, setRandomPwd] = useState("");

		// handleChange function to update the form state when the user types in the inputs
		const handleChange = (e) => {
				setForm({ ...form, [e.target.name]: e.target.value });
			};

		// handles the submission of the form, sends a POST request to the backend to create a new user with the form data
		const handleSubmit = async (e) => {
			// Prevent the default form submission behavior
			e.preventDefault();

			try {
		
				// Debbuging
				console.log("URL:", import.meta.env.VITE_API_URL);
				// Send a POST request to the backend to create a new user with the form data
				const res = await fetch(`${import.meta.env.VITE_API_URL}/profils`,{	
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(form),	
				});

				// response is stored inside data variable
				const data = await res.json();

				// throws error if response is not ok
				if (!res.ok) {
					throw new Error(data.error || data.message || 'Failed to create user');
				}

				// if user's created, sets the message with it's ID or with the message from the response
				setMessage(data.message || `User created successfully with ID: ${data.userId}`);
				setForm({ username: '', email: '', password: '', isAdmin : false}); // clears the form


			} catch(error){
				// If there is an error, set the message state to the error message
				setMessage(error.message);
			}
		}

		// 
		const handleRandomPwd = async (e) => {
			try {
				e.preventDefault();
				// renames length to longueur
				const longueur = length;

				// sends a GET request to the backend to generate a random password with the specified length
				const res = await fetch(
					`${import.meta.env.VITE_API_URL}/motdepasse/${longueur}`,
					{
						method: "GET",
						headers: { "Content-Type": "application/json" },
					},
				);

				// response is stored inside data variable
				const data = await res.json();
				console.log(data);

				// gets the generated password from the response
				const randomPwd = data.password;

				// sets the random password state with the generated password from the response
				setForm({ ...form, password: randomPwd });
				setMessage("");

				// throws error if response is not ok
				if (!res.ok) {
					throw new Error(data.message || "Failed to create random password");
				}
			} catch(error){
				// If there is an error, set the message state to the error message
				setMessage(error.message || " Failed to generate random password.");
			}
		}

		// update the length state when the user chooses the length from the dropdown menu
		const handleLengthChange = (e) => {
			setLength(e.target.value);
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

					<p>or...</p>

					{/* generate a random password */}
					<div className="container my-3">
						<label htmlFor="length">Password Length:</label>
						<input
							type="number"
							min="8"
							max="30"
							value={length}
							onChange={handleLengthChange}
						></input>
						<button name="random-pwd" type="button" className="btn btn-secondary" onClick={handleRandomPwd}>
							Generate random password
						</button>
					</div>

					{/* Checkbox for administrator account 
						Admin accounts can do all the router requests
					*/}
					<div className="checkbox">
						<label>
							<input type="checkbox" 
							name = "isAdmin"
							/*The checkbox is marjed only if the user is an Admin */ 
							checked = {form.isAdmin}
							// If the checkbox is marked we update our form so isAdmin is True, otherwise will stay as false
							onChange={(e)=> setForm ({... form , isAdmin:e.target.checked})}
							/> Administrator Account
						</label>
					</div>
					{/* Submit button */}
					<button type="submit" className="btn btn-primary mt-3">
						Create user
					</button>
					
					{/*Error message */}
					{message && (
						<div className = "alert-danger mt-3">
							{message}
						</div>
					)}


				</form>
			</div>
		);
	}

	export default CreateUserForm;
