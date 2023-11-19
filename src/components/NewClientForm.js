import React, { useState, useEffect } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';

export default function NewClientForm() {
    const navigate = useNavigate()
    const base_url = 'http://localhost:8080'
    const client_url = new URL('clients/', base_url)

    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const bodyObj = {
            client_name: name,
        };

        fetch(client_url, {
            method: "POST",
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
                    <input onChange={(e) => setName(e.target.value)}></input>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <Link to={"/clients"}>
                <button value="all clients">all clients</button>
            </Link>
        </>
    )
}

