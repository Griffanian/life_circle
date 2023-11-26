import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getClientList } from '../frontEndFuncs/clientFunc';
import { createRating } from '../frontEndFuncs/ratingFuncs';
import { capitalize } from 'lodash';

export default function NewRatingForm() {
    const navigate = useNavigate();
    const { client_id_param } = useParams();
    const currentDate = new Date().toISOString().split('T')[0];
    const categories = process.env.REACT_APP_CATEGORIES.split(',');
    const [formData, setFormData] = useState({
        client: '',
        ratings: Object.fromEntries(categories.map(category => [category, 1])),
        date: currentDate,
    });

    useEffect(() => {
        if (client_id_param) {
            setFormData(prevData => ({ ...prevData, client: client_id_param }));
        }
        getClientList()
            .then((clients) => setFormData(prevData => ({ ...prevData, client_list: clients })))
            .catch((error) => {
                console.error("Error fetching clients:", error);
            });
    }, [client_id_param]);

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
            client_id: formData.client,
            rating_date: formData.date,
            ...formData.ratings,
        };

        createRating(bodyObj)
            .then(data => {
                if (data.ok) {
                    navigate("/ratings/" + formData.client);
                }
            })
            .catch((error) => {
                console.error('Error creating rating:', error);
            });
    };

    return (
        <div className='home'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Client:
                    <select name='client' className='clientSelect' value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })}>
                        <option value="">-- Select a client --</option>
                        {formData.client_list && formData.client_list.map((client) => (
                            <option key={client.client_id} value={client.client_id}>{client.client_name}</option>
                        ))}
                    </select>
                </label>
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
            <Link to={"/ratings/" + formData.client}>
                <button value="all ratings">All Ratings</button>
            </Link>
        </div>
    );
};
