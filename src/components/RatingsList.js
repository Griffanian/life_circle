import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import { getBritishDateFormat } from "../frontEndFuncs/prettyFuncs";
import { getRatinglist, deleteRating } from "../frontEndFuncs/ratingFuncs";
import RadarChart from './RadarChart';

export default function RatingList() {

    let { client_id_param } = useParams()

    const categories = process.env.REACT_APP_CATEGORIES.split(',');

    const [ratings, setRatings] = useState([])

    useEffect(() => {
        if (client_id_param) {
            getRatinglist(client_id_param)
                .then(data => {
                    if (data.ok) {
                        setRatings(data.ratings)
                    }
                })
        }
    }, [client_id_param])

    const handleDelete = (e) => {
        e.preventDefault()
        deleteRating(e.target.value)
            .then(data => {
                if (data.ok) {
                    window.location.reload()
                }
            })
    }
    return (
        <>{ratings[0] ?
            <div>
                <p>{ratings[0]["client_name"]}</p>

                <Link to={"/editClient/" + client_id_param}>
                    <button value="edit client">edit client</button>
                </Link>
            </div > : ""
        }
            {ratings.length > 0 ? <RadarChart ratings={ratings} /> : ""}
            <Link to={"/addRating/" + client_id_param}>
                <button value="add rating">add rating</button>
            </Link>
            <Link to={"/clients"}>
                <button value="all clients">all clients</button>
            </Link>
            {
                ratings.map((rating) => {
                    return (
                        <div className="ratings" key={rating.rating_id}>
                            <p>{getBritishDateFormat(rating.rating_date)}</p>
                            {
                                categories.map((category) => {
                                    return (<p key={categories.indexOf(category)}>{rating[category]}</p>)
                                })
                            }
                            <Link to={"/editRating/" + rating.rating_id}>
                                <button value="edit rating">edit rating</button>
                            </Link>

                            <button onClick={(e) => handleDelete(e)} value={rating.rating_id}>delete rating</button>
                        </div>
                    )
                })
            }
        </>
    )
}