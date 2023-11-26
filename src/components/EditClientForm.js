import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getClient, editClient } from '../frontEndFuncs/clientFunc';

export default function EditClientForm() {
    const navigate = useNavigate()

    let { client_id_param } = useParams()

    const [client, setClient] = useState({})
    const [newName, setNewName] = useState('')

    useEffect(() => {
        getClient(client_id_param)
            .then((res) => {
                setClient(res)
                setNewName(res.client_name)
            })
    }, [client_id_param])

    const handleSubmit = (e) => {
        e.preventDefault();
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
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Name:
                    <input value={newName} onChange={(e) => setNewName(e.target.value)}></input>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <Link to={"/clients"}>
                <button value="all clients">all clients</button>
            </Link>
        </>
    )
}

