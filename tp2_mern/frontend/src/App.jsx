import CreateUserForm from "./components/CreateUserForm";

const App = () => {
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
