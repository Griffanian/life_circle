import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getClient } from '../frontEndFuncs/clientFuncs';
import { createRating } from '../frontEndFuncs/ratingFuncs';
import { capitalize } from 'lodash';
import { getInitials } from '../frontEndFuncs/miscFuncs';
import { Slider } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

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

    const scaleValues = Array.from({ length: 10 }, (_, index) => index + 1);

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
            <div className='mainBody'>
                <div className='formStyles'>
                    <div className='formHeader'>
                        <a onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left-long"></i></a>
                        <h1>Create Rating</h1>
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
                                    defaultValue={1}
                                    min={1}
                                    step={1}
                                    max={10}
                                    onChange={(value) => handleRatingsChange(category, value)}
                                    graduated progress
                                    color="#326aff"
                                />
                            </label>
                        ))}
                        <input type="date" onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).toISOString().split('T')[0] })} defaultValue={currentDate} />
                        <input type="submit" value="Submit" />
                    </form>
                    {error ? (<p>{error}</p>) : null}
                </div>
            </div>
        ) : (
            <div className="loader"></div>
        )
    );
};
