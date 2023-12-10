import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash';
import { getRating, editRating, deleteRating } from '../frontEndFuncs/ratingFuncs';
import { getFormattedDate } from '../frontEndFuncs/miscFuncs';

const EditRatingForm = () => {
    const navigate = useNavigate();
    const { rating_id_param } = useParams();
    const currentDate = new Date().toISOString().split('T')[0];
    const categories = process.env.REACT_APP_CATEGORIES.split(',');

    const [formData, setFormData] = useState({
        ratings: categories.reduce((acc, category) => {
            acc[category] = 1;
            return acc;
        }, {}),
        date: currentDate,
        rating_id: '',
        client_id: 0,
        client_name: '',
    });
    const [serverResponded, setServerResponded] = useState(false);

    useEffect(() => {
        if (rating_id_param !== formData.rating_id) {
            getRating(rating_id_param)
                .then(data => {
                    setServerResponded(true)
                    setFormData({
                        ...formData,
                        client_id: data.client_id,
                        client_name: data.client_name,
                        date: data.rating_date,
                        rating_id: data.rating_id,
                        ratings: categories.reduce((acc, category) => {
                            acc[category] = data[category];
                            return acc;
                        }, {}),
                    });
                })
                .catch((error) => {
                    console.error('Error fetching rating:', error);
                });
        }
    }, [rating_id_param]);

    const handleRatingsChange = (category, value) => {
        const valueInt = parseInt(value, 10);
        const newValue = Math.max(1, Math.min(10, valueInt));
        setFormData((prevData) => ({
            ...prevData,
            ratings: { ...prevData.ratings, [category]: newValue },
        }));
    };

    const handleSubmit = (e) => {
        setServerResponded(false);
        e.preventDefault();
        const bodyObj = {
            rating_id: formData.rating_id,
            rating_date: formData.date,
            ...formData.ratings,
        };

        editRating(bodyObj)
            .then(data => {
                if (data.ok) {
                    navigate(`/ratings/${formData.client_id}`);
                }
            })
            .catch((error) => {
                console.error('Error editing rating:', error);
            });
    };

    const handleDelete = (e) => {
        e.preventDefault()
        setServerResponded(false)
        deleteRating(e.target.value)
            .then(data => {
                if (data.ok) {
                    navigate(`/ratings/${formData.client_id}`);
                }
            })
    }

    return (
        serverResponded ? (
            <div className='home'>
                <form onSubmit={handleSubmit}>
                    <p>Name: {formData.client_name}</p>
                    {categories.map((category) => (
                        <label key={category}>
                            {capitalize(category)}:
                            <select
                                value={formData.ratings[category] ? formData.ratings[category] : ''}
                                onChange={(e) => handleRatingsChange(category, e.target.value)}
                            >
                                {Array.from({ length: 10 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                        </label>
                    ))}
                    <p>{getFormattedDate(formData.date)}</p>
                    <input type='submit' value='Submit' />
                    <button onClick={(e) => handleDelete(e)} value={rating_id_param}>delete rating</button>
                </form>
            </div>
        ) : (<div className="loader"></div>)
    )
};

export default EditRatingForm;
