import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getClient, editClient, deleteClient } from '../frontEndFuncs/clientFuncs';

export default function EditClientForm() {
    const navigate = useNavigate()

    let { client_id_param } = useParams()

    const [client, setClient] = useState({})
    const [newName, setNewName] = useState('')
    const [serverResponded, setServerResponded] = useState(false);

    useEffect(() => {
        getClient(client_id_param)
            .then((res) => {
                setServerResponded(true);
                setClient(res)
                setNewName(res.client_name)
            })
    }, [client_id_param])

    const handleDelete = (event) => {
        event.preventDefault();
        setServerResponded(false);
        deleteClient(client.client_id)
            .then((res) => {
                if (res.message === "success") {
                    navigate('/clients')
                } else {
                    setError("Error deleting client");
                    setServerResponded(true);
                }
            })
            .catch((error) => {
                setError("Error deleting client:", error);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setServerResponded(false);
        editClient({
            client_id: client.client_id,
            client_name: newName,

        })
            .then(res => {
                if (res.message === 'success') {
                    navigate('/clients')
                }
            })
    }

    return (
        serverResponded ? (
            <>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>Name:
                        <input value={newName} onChange={(e) => setNewName(e.target.value)}></input>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <button onClick={handleDelete} value={client.client_id}>
                    delete client
                </button>
                <Link to={"/clients"}>
                    <button value="all clients">all clients</button>
                </Link>
            </>
        ) : (
            <div className="loader"></div>
        )
    )
}

