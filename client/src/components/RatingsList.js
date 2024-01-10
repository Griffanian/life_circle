import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import { getFormattedDate, getInitials } from "../frontEndFuncs/miscFuncs";
import { getRatinglist, deleteRating } from "../frontEndFuncs/ratingFuncs";
import { capitalize } from 'lodash';
import RadarChart from './RadarChart';


export default function RatingList() {

    let { client_id_param } = useParams()

    const categories = process.env.REACT_APP_CATEGORIES.split(',')
    const [ratings, setRatings] = useState([])
    const [serverResponded, setServerResponded] = useState(false);

    useEffect(() => {
        if (client_id_param) {
            getRatinglist(client_id_param)
                .then(data => {
                    if (data.ok) {
                        setServerResponded(true);
                        const ratingsWithAverage = addAverage(data.ratings);
                        setRatings(ratingsWithAverage);
                    }
                })
        }
    }, [client_id_param]);

    const addAverage = (ratings) => {
        return ratings.map(rating => {
            let sum = 0;
            for (const [key, value] of Object.entries(rating)) {
                if (categories.includes(key)) {
                    sum += value;
                }
            }
            rating['average'] = sum / categories.length;
            return rating;
        });
    };


    const handleDelete = (e) => {
        e.preventDefault()
        setServerResponded(false)
        deleteRating(e.target.value)
            .then(data => {
                if (data.ok) {
                    setRatings(ratings.filter((rating) => rating.rating_id != e.target.value))
                    setServerResponded(true)
                }
            })
    }
    return (
        serverResponded ? (
            <>{ratings[0] ?
                (<div>
                    <p>{getInitials(ratings[0]["client_name"])}</p>

                    <Link to={"/editClient/" + client_id_param}>
                        <button value="edit client">edit client</button>
                    </Link>
                </div >) : (<p>This client has no ratings yet.</p>)
            }
                {/* {ratings.length > 0 ? <RadarChart ratings={ratings} /> : ""} */}
                <div>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Average</th>
                                {
                                    categories.map((category) => {
                                        return (<th key={category} >{capitalize(category)}</th>)
                                    })
                                }
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ratings.map((rating) => {
                                    return (
                                        <tr key={rating.rating_id}>
                                            <td>{getFormattedDate(rating.rating_date)}</td>
                                            <td>{rating.average}</td>
                                            {
                                                categories.map((category) => {
                                                    return (<td key={categories.indexOf(category)}>{rating[category]}</td>)
                                                })
                                            }
                                            <td>
                                                <Link to={"/editRating/" + rating.rating_id}>
                                                    <button value="edit rating">edit rating</button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button onClick={(e) => handleDelete(e)} value={rating.rating_id}>delete rating</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <Link to={"/addRating/" + client_id_param}>
                        <button value="add rating">add rating</button>
                    </Link>
                    <Link to={"/clients"}>
                        <button value="all clients">all clients</button>
                    </Link>
                </div>
                {ratings.length > 0 ? <RadarChart ratings={ratings} /> : ""}
            </>
        ) : (<div className="loader"></div>)
    )
}