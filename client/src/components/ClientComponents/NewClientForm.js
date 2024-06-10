import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '../../frontEndFuncs/clientFuncs';


export default function NewClientForm() {

    const navigate = useNavigate()

    const [clientName, setClientName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bodyObj = {
            client_name: clientName
        };
        const newClient = await createClient(bodyObj);
        if (newClient.success) {
            navigate('/clients')
        } else {
            console.log('Error:', newClient.error)
        }
    };

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
                    <input name="client name" value={clientName} placeholder='E.g. John Doe' onChange={(e) => setClientName(e.target.value)}></input>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

