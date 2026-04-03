import { useState } from 'react'
import CreateUserForm from './components/CreateUserForm';
import './App.css'

const App = () => {
  const [inputId, setInputId] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <div className="container">
      <h1>User Management</h1>

      <>
        <h2>Create a new user</h2>
        <CreateUserForm/>
      </>
     
      

    </div>
  )
}

export default App
