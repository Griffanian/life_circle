import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditRatingForm() {

    const navigate = useNavigate()
    let { rating_id_param } = useParams()

    const base_url = 'http://localhost:8080'
    const rating_url = new URL('rating/' + rating_id_param, base_url)
    const currentDate = new Date().toISOString().split('T')[0];


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

    function get_formatted_date(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const [ratings, setRatings] = useState(
        categories.reduce((acc, category) => {
            acc[category] = 1;
            return acc;
        }, {})
    );

    const [date, setDate] = useState(currentDate);
    const [rating_id, setRating_id] = useState('')
    const [client_id, setClient_id] = useState(0)
    const [client_name, setClient_name] = useState('')

    useEffect(() => {
        if (rating_id_param) {
            setRating_id(rating_id_param)
        }
        fetch(rating_url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",

        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setClient_id(data.client_id)
                    setClient_name(data.client_name)
                    setDate(get_formatted_date(new Date(data.rating_date)))
                    setRating_id(data.rating_id)
                    categories.forEach(category => {
                        setRatings((prevRatings) => ({ ...prevRatings, [category]: data[category] }));
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log("server is down!!")
            })
    }, [])

    const getCapitalizeString = (str) => {
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
            rating_id: rating_id,
            rating_date: date,
        };

        categories.map(category => bodyObj[category] = ratings[category])

        const ratings_url = new URL('ratings/', base_url)

        fetch(ratings_url, {
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
                <p>{client_name}</p>
                {categories.map((category) => (
                    <label key={category}>{getCapitalizeString(category)}:
                        <select value={ratings[category] ? ratings[category] : ''} onChange={(e) => handleRatingsChange(category, e.target.value)}>
                            {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                </option>
                            ))}
                        </select>
                    </label>
                ))}
                <input type="date" value={date} onChange={(e) => setDate(new Date(e.target.value))} />
                <input type="submit" value="Submit" />
            </form>
        </div>

    );
};
