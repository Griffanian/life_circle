import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function EditClientForm() {
    const navigate = useNavigate()

    let { client_id_param } = useParams()

    const base_url = 'http://localhost:8080'
    const client_url = new URL('client/' + client_id_param, base_url)

    const [name, setName] = useState('')

    useEffect(() => {
        fetch(client_url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",

        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setName(data.client_name)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log("server is down!!")
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const bodyObj = {
            client_name: name,
        };

        fetch(client_url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyObj),
            credentials: "include",

        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    console.log('ok')
                    navigate('/clients')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log("server is down!!")
            })
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Name:
                    <input value={name} onChange={(e) => setName(e.target.value)}></input>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <Link to={"/clients"}>
                <button value="all clients">all clients</button>
            </Link>
        </>
    )
}

