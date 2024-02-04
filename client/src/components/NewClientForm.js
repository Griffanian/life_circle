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
        <div className='mainBody'>
            <div className='formStyles'>
                <div className='formHeader'>
                    <div className='createClientHeader'>
                        <a onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left-long"></i></a>
                        <h1>Create Client</h1>
                    </div>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <p>Name</p>
                    <input name="client name" value={name} placeholder='E.g. John Doe' onChange={(e) => setName(e.target.value)}></input>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

