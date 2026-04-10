import { useState } from "react";
import CreateUserForm from "./components/CreateUserForm";
import FindUser from "./components/FindUser";
import "./App.css";

const App = () => {
	const [inputId, setInputId] = useState("");
	const [userId, setUserId] = useState("");

	return (
		<div className="container">
			<h1>User Management</h1>

			<>
				<h2>Create a new user</h2>
				<CreateUserForm />
			</>
			<>
				<h2>Find a user</h2>
				{/* input field to enter user ID and button to search for the user */}
				<div className="input-group">
					<input
						type="text"
						placeholder="ID de l'utilisateur"
						value={inputId}
						onChange={(e) => setInputId(e.target.value)}
					/>
					<button className="btn-primary" onClick={() => setUserId(inputId.trim())}> Search </button>
				</div>
        {/* user display */}
				{userId && <FindUser userId={userId} />}
			</>
		</div>
	);
};

export default App;
