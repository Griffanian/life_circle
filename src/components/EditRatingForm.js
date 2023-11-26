import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash';
import { getRating, editRating } from '../frontEndFuncs/ratingFuncs';

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

    useEffect(() => {
        if (rating_id_param !== formData.rating_id) {
            getRating(rating_id_param)
                .then(data => {
                    const formattedDate = getFormattedDate(new Date(data.rating_date));
                    setFormData({
                        ...formData,
                        client_id: data.client_id,
                        client_name: data.client_name,
                        date: formattedDate,
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

    const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleRatingsChange = (category, value) => {
        const valueInt = parseInt(value, 10);
        const newValue = Math.max(1, Math.min(10, valueInt));
        setFormData((prevData) => ({
            ...prevData,
            ratings: { ...prevData.ratings, [category]: newValue },
        }));
    };

    const handleSubmit = (e) => {
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

    return (
        <div className='home'>
            <form onSubmit={handleSubmit}>
                <p>{formData.client_name}</p>
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
                <input type='date' value={formData.date} onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).toISOString().split('T')[0] })} />
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
};

export default EditRatingForm;
