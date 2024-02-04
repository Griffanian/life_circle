import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useHis } from 'react-router-dom';
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

        const isConfirmed = window.confirm("Are you sure you want to delete this client?");

        if (isConfirmed) {
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
            <div className='mainBody'>
                <div className='formStyles'>
                    <div className='formHeader'>
                        <div>
                            <a onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left-long"></i></a>
                            <h1>Edit Client</h1>
                        </div>
                        <a onClick={handleDelete} value={client.client_id}>
                            <i className="fa-solid fa-trash"></i>
                        </a>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <p>Name</p>
                        <input name='Client Name' value={newName} onChange={(e) => setNewName(e.target.value)}></input>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        ) : (
            <div className="loader"></div>
        )
    )
}

