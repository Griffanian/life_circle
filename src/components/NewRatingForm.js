import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getClient } from '../frontEndFuncs/clientFuncs';
import { createRating } from '../frontEndFuncs/ratingFuncs';
import { capitalize } from 'lodash';

export default function NewRatingForm() {
    const navigate = useNavigate();

    const { client_id_param } = useParams();

    const currentDate = new Date().toISOString().split('T')[0];

    const categories = process.env.REACT_APP_CATEGORIES.split(',');

    const [formData, setFormData] = useState({
        client_id: '',
        client_name: '',
        ratings: Object.fromEntries(categories.map(category => [category, 1])),
        date: currentDate,
    });
    const [serverResponded, setServerResponded] = useState(false);
    const [error, setError] = useState('')

    useEffect(() => {
        if (client_id_param) {
            setFormData(prevData => ({ ...prevData, client_id: client_id_param }));
        }
        getClient(client_id_param)
            .then((client) => {
                setServerResponded(true)
                setFormData((prevData) => ({ ...prevData, client_name: client.client_name }))
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
            });
    }, []);

    const handleRatingsChange = (category, value) => {
        const valueInt = parseInt(value, 10);
        const newValue = Math.max(1, Math.min(10, valueInt));
        setFormData(prevData => ({
            ...prevData,
            ratings: { ...prevData.ratings, [category]: newValue }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bodyObj = {
            client_id: formData.client_id,
            rating_date: formData.date,
            ...formData.ratings,
        };
        setServerResponded(false);
        createRating(bodyObj)
            .then(data => {
                if (data?.ok) {
                    navigate("/ratings/" + formData.client_id);
                } else {
                    setServerResponded(true);
                    setError(data.message);
                }
            })
            .catch((error) => {
                setServerResponded(true)
                console.error('Error creating rating:', error);
            });
    };

    return (
        serverResponded ? (
            <div className='home'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>Name: {formData.client_name}</label>
                    {categories.map((category) => (
                        <label key={category}>{capitalize(category)}:
                            <select onChange={(e) => handleRatingsChange(category, e.target.value)} value={formData.ratings[category]}>
                                {[...Array(10).keys()].map((num) => (
                                    <option key={num + 1} value={num + 1}>
                                        {num + 1}
                                    </option>
                                ))}
                            </select>
                        </label>
                    ))}
                    <input type="date" onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).toISOString().split('T')[0] })} defaultValue={currentDate} />
                    <input type="submit" value="Submit" />
                </form>
                {error ? (<p>{error}</p>) : null}
                <Link to={"/ratings/" + formData.client_id}>
                    <button value="all ratings">All Ratings</button>
                </Link>
            </div>
        ) : (
            <div className="loader"></div>
        )
    );
};
