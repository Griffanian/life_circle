import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '../frontEndFuncs/clientFuncs';


export default function NewClientForm() {

    const navigate = useNavigate()

    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        createClient({
            client_name: name,
        })
            .then(data => {
                if (data.ok === true) {
                    navigate('/clients')
                }
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

