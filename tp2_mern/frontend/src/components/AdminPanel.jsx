import{useState} from 'react';

//l'interface d'administration permettant de rechercher et de supprimer des utilisateurs
function AdminPanel(){
    // Keep the state of our screen
    const[searchId, setSearchId] = useState('');
    const[userFound, setUserFound] = useState(null);
    const[message, setMessage] = useState('');
    const[isError, setError] = useState(false);


    const handleSearch = async(e) => {

        // Avoid the reload of the screen
        e.preventDefault();

        setMessage("Looking in the data base ... ");
        setUserFound(null);

        try{
            // We ask to our backend the the userID by using Fetch
            const answer = await fetch(`http://localhost:3000/profils/${searchId}`);

            // Verify the answer
            if(answer.ok){
                // Verify the content of the answer
                const user = await answer.json();
                setUserFound(user);
                setMessage('');
            }
            else{
                setUserFound(null);
                setError(true);
                setMessage("Not such user with this id")
            }

        }
        catch(mistake){
            console.error("Error with connexion", mistake);
            setUserFound(null);
            setMessage("Problem with the connexion")
            setError(true);
        }

    };

    const handleDelete = async()=>{
        // Ask the backend to delete
        try{
            const answer = await fetch(`http://localhost:3000/profils/${userFound.id}`, {
                method: 'DELETE'
            });
        
        if(answer.ok){
            setMessage(`User ${userFound.name} deleted with succes`);
            // Reinitialize the variables
            setError(false);
            setSearchId('')
            setUserFound(null)
        }else{
            setMessage("Could not delet user")
            setError(true);
        }}catch(mistake){
            console.error("Error with deletion" , mistake);
            setMessage("Problem with connexion");
            Error(true);
        }
    };
    return(

    <div className='container mt-5' style={{maxWidth: '600px'}}>
        <h2 className='mb-4 text-center'>Admin area</h2>

        {/****Search card}*/}
        <div className='card shadow-sm mb-4'>
            <div className='card-body'>
                <h3 className='card-title h5 mb-3'>Find user</h3>
                <form onSubmit={handleSearch} className='d-flex gap-2'>
                    <input
                        type = "text"
                        className = "form-control"
                        placeholder = "Type the id of the user"
                        value = {searchId}
                        onChange= {(e)=> setSearchId(e.target.value)}
                        />
                        <button type = "submit" className='btn btn-primary'>
                            Search
                        </button>
                </form>
            </div>
        </div>
        {/*Alerts from the feedback of the Boostrap*/}
        {message && (
        <div className={`alert ${isError ? 'alert-danger' : 'alert-info'}`} role="alert">
          {message}
        </div>
        )}

        {/* Card from the informations of the user*/}
        {userFound && (
                <div className='card border-primary shadow-sm'>
                    <div className = 'card-header bg-primary text-white font-weight-bold'>
                        Data from the user
                    </div>
                    <div className='card-body'>
                        <p className='card-text'><strong>ID: </strong>{userFound.id || userFound._id}</p>
                        <p className='card-text'><strong>Name: </strong>{userFound.username || userFound._username}</p>
                        <p className='card-text'><strong>Email: </strong>{userFound.email}</p>
                    </div>
                    
                    <button onClick={handleDelete} className='btn btn-danger w-100 mt-3'>
                        Delete user
                    </button>
                </div>   
            )
        }
    </div>
);
}
export default AdminPanel;