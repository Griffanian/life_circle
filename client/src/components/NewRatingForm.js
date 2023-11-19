import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function NewRatingForm() {

    const navigate = useNavigate()

    const base_url = 'http://localhost:8080'
    const ratings_url = new URL('ratings/', base_url)

    const currentDate = new Date().toISOString().split('T')[0];
    let { client_id_param } = useParams()

    const categories = [
        'energy',
        'work/income',
        'partner',
        'children/next_gen',
        'friends',
        'life_attitude',
        'family',
        'intel/acad',
        'giving_back',
        'hobbies',
    ];

    const [ratings, setRatings] = useState(
        categories.reduce((acc, category) => {
            acc[category] = 1;
            return acc;
        }, {})
    );

    const [date, setDate] = useState(currentDate);

    const [client_id, setClient_id] = useState('')

    const [client_list, setClient_list] = useState([]);

    useEffect(() => {
        const client_url = new URL('clients/', base_url)
        if (client_id_param) {
            setClient_id(client_id_param)
        }
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
                    setClient_list(data.client_list)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log("server is down!!")
            })
    }, [client_id_param])

    const capitalizeString = (str) => {
        return str
            .split('/')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join('/ ')
            .replace(/_/g, ' ');
    };

    const handleRatingsChange = (category, value) => {
        const valueInt = parseInt(value, 10);
        const newValue = Math.max(1, Math.min(10, valueInt));
        setRatings((prevRatings) => ({ ...prevRatings, [category]: newValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bodyObj = {
            client_id: client_id,
            rating_date: date,
        };

        categories.map(category => bodyObj[category] = ratings[category])
        console.log(bodyObj)

        fetch(ratings_url, {
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
                    navigate("/ratings/" + client_id)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log("server is down!!")
            })
    }

    return (
        <div className='home'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Client:
                    <select name='client' className='clientSelect' value={client_id} onChange={(e) => setClient_id(e.target.value)}>
                        <option value="">-- Select --</option>
                        {client_list.map((client) => (
                            <option key={client.client_id} value={client.client_id}>{client.client_name}</option>
                        ))}
                    </select>
                </label>
                {categories.map((category) => (
                    <label key={category}>{capitalizeString(category)}:
                        <select onChange={(e) => handleRatingsChange(category, e.target.value)}>
                            {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                </option>
                            ))}
                        </select>
                    </label>
                ))}
                <input type="date" onChange={(e) => setDate(new Date(e.target.value))} defaultValue={currentDate} />
                <input type="submit" value="Submit" />
            </form>
            <Link to={"/ratings/" + client_id}>
                <button value="all ratings">all ratings</button>
            </Link>
        </div>

    );
};
