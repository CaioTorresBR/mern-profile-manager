import { useState } from "react";
import CreateUserForm from "./components/CreateUserForm";
import FindUser from "./components/FindUser";
import AdminPanel from "./components/AdminPanel";

const App = () => {
	const [inputId, setInputId] = useState("");
	const [userId, setUserId] = useState("");

	return (
		<div className="container d-flex flex-column align-items-center gap-4">
			<h1>User Management</h1>
			
			<div className="container d-flex flex-column align-items-center gap-4 ">
				<h2>Create a new user</h2>
				<CreateUserForm />
			</div>

			<div className="container d-flex flex-column align-items-center gap-4">
				<h2>Edit your profile</h2>
				{/* input field to enter user ID and button to search for the user */}
				<div className="input-group w-100 ">
					<input
						type="text"
						placeholder="ID de l'utilisateur"
						value={inputId}
						onChange={(e) => setInputId(e.target.value)}
					/>
					<button
						className="btn-primary"
						onClick={() => setUserId(inputId.trim())}
					>
						{" "}
						Search{" "}
					</button>
				</div>
				{/* user display */}
				{userId && <FindUser userId={userId} />}
			</div>
			<AdminPanel />
		</div>
	);
};

export default App;
