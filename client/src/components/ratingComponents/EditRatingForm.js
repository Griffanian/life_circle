import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash';
import { getRating, editRating, deleteRating } from '../../frontEndFuncs/ratingFuncs';
import { getFormattedDate, getInitials } from '../../frontEndFuncs/miscFuncs';
import { Slider } from 'rsuite';
import globals from '../../globals'

const EditRatingForm = () => {
    const navigate = useNavigate();
    const { rating_id_param } = useParams();
    const currentDate = new Date().toISOString().split('T')[0];
    const categories = globals.CATEGORIES;
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
                        date: data.rating.rating_date,
                        rating_id: data.rating.rating_id,
                        ratings: categories.reduce((acc, category) => {
                            acc[category] = data.rating[category];
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
                if (data.success) {
                    navigate(`/ratings/${formData.client_id}`);
                }
            })
            .catch((error) => {
                console.error('Error editing rating:', error);
            });
    };

    const handleDelete = (e, rating_id) => {
        e.preventDefault()

        const isConfirmed = window.confirm("Are you sure you want to delete this client?");

        if (isConfirmed) {
            setServerResponded(false)
            deleteRating(rating_id)
                .then(data => {
                    if (data.ok) {
                        navigate(`/ratings/${formData.client_id}`);
                    }
                })
        }
    }

    const scaleValues = Array.from({ length: 10 }, (_, index) => index + 1);

    return (
        serverResponded ? (
            <div className='mainBody'>
                <div className='formStyles'>
                    <div className='formHeader'>
                        <a onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left-long"></i></a>
                        <h1>Edit Rating</h1>
                        <a onClick={(e) => handleDelete(e, rating_id_param)}>
                            <i className="fa-solid fa-trash"></i>
                        </a>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>

                        <p>Name {getInitials(formData.client_name)} </p>
                        {categories.map((category) => (
                            <label className='sliderLabels' key={category}>{capitalize(category)}
                                <div className='sliderNums'>
                                    {scaleValues.map((val, index) => (
                                        <div key={index}>{val}</div>
                                    ))}
                                </div>
                                <Slider
                                    defaultValue={formData.ratings[category] ? formData.ratings[category] : ''}
                                    min={1}
                                    step={1}
                                    max={10}
                                    onChange={(value) => handleRatingsChange(category, value)}
                                    graduated progress
                                    color="#326aff"
                                />
                            </label>
                        ))}
                        <p>{getFormattedDate(formData.date)}</p>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        ) : (<div className="loader"></div>)
    )
};

export default EditRatingForm;
