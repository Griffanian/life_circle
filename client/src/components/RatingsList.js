import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom";
import { getInitials, addAverage } from "../frontEndFuncs/miscFuncs";
import { getRatinglist, deleteRating } from "../frontEndFuncs/ratingFuncs";
import RadarChart from './RadarChart';
import { getClient } from "../frontEndFuncs/clientFuncs";
import RatingTable from "./RatingTable";

export default function RatingList() {

    let { client_id_param } = useParams()
    const navigate = useNavigate()
    const categories = process.env.REACT_APP_CATEGORIES.split(',')
    const [ratings, setRatings] = useState([])
    const [serverResponded, setServerResponded] = useState(false);
    const [clientName, setClientName] = useState('')

    useEffect(() => {
        if (client_id_param) {
            getRatinglist(client_id_param)
                .then(data => {
                    if (data.ok) {
                        setServerResponded(true);
                        const ratingsWithAverage = addAverage(data.ratings, categories);
                        setRatings(ratingsWithAverage);
                    }
                })
            getClient(client_id_param)
                .then(data => {
                    if (data.ok) {
                        setClientName(data.client_name)
                    }
                })
        }
    }, [client_id_param]);




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
        <>
            <div className="ratingListHeader">
                <div>
                    <a onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left-long"></i></a>
                    <h1>Client Ratings</h1>
                    <Link to={"/addRating/" + client_id_param}>
                        <div className="addRating">
                            <i className="fa-solid fa-circle-plus"></i>
                        </div>
                    </Link>
                </div>
                {
                    clientName ? (
                        <Link to={"/editClient/" + client_id_param}>
                            <button>
                                {getInitials(clientName)}
                                <i className="fa-solid fa-pen"></i>
                            </button>
                        </Link>
                    ) : (<></>)
                }
            </div>
            {
                serverResponded ? (
                    <>
                        {
                            ratings.length > 0 ? (
                                <RatingTable categories={categories} ratings={ratings} />
                            ) : (
                                <div className="noRatings">
                                    <p>This client has no ratings yet.</p>
                                </div >

                            )
                        }
                        {ratings.length > 0 ? <RadarChart ratings={ratings} /> : ""}
                    </>
                ) : (<div className="loader"></div>)
            }
        </>)
}