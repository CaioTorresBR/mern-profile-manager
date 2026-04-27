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
		</div>
	);
};

export default App;
