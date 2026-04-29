import { useState } from "react";
import CreateUserForm from "./components/CreateUserForm";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import FindUser from "./components/FindUser";

const App = () => {
	const [loggedUser, setLoggedUser] = useState(() => {
		const savedUser = localStorage.getItem("user");
		return savedUser ? JSON.parse(savedUser) : null;
	});

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setLoggedUser(null);
	};

	return (
		<div className="container d-flex flex-column align-items-center gap-4">
			<h1>User Management</h1>
			
			<div className="container d-flex flex-column align-items-center gap-4 ">
				<h2>Create a new user</h2>
				<CreateUserForm />
			</div>
		

			{/* Login */}
			{!loggedUser ? (
				<Login onLogin={setLoggedUser} />
			) : (
				<>
					<p>
						Logged in as {loggedUser.username}{" "}
						{loggedUser.isAdmin ? "(admin)" : "(user)"}
					</p>

					<button className="btn btn-danger" onClick={handleLogout}>
						Logout
					</button>

					{/* admin or user */}
					{loggedUser.isAdmin ? (
						<AdminPanel />
					) : (
						<FindUser userId={loggedUser._id || loggedUser.id} />
					)}
				</>
			)}
		</div>
	);
};

export default App;
