import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom";
import { getInitials, addAverage } from "../frontEndFuncs/miscFuncs";
import { getRatinglist, deleteRating } from "../frontEndFuncs/ratingFuncs";
import RadarChart from './RadarChart';
import { getClient } from "../frontEndFuncs/clientFuncs";
import RatingTable from "./RatingTable";
import RatingListHeader from "./RatingListHeader";

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




    const handleDelete = (e, rating_id) => {
        e.preventDefault()
        setServerResponded(false)
        deleteRating(rating_id)
            .then(data => {
                if (data.ok) {
                    setRatings(ratings.filter((rating) => rating.rating_id != e.target.value))
                    setServerResponded(true)
                    window.location.reload()
                }
            })
    }
    function handleDownloadImage(e) {
        e.preventDefault();

        const chartCanvases = document.getElementsByTagName('canvas');

        if (chartCanvases.length > 0) {
            const chartCanvas = chartCanvases[0];
            const downloadLink = document.createElement('a');
            downloadLink.href = chartCanvas.toDataURL();
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            downloadLink.download = "Col_" + getInitials(clientName) + '_' + today;
            downloadLink.click();
        }
    };

    return (
        <>
            <RatingListHeader navigate={navigate} clientName={clientName} client_id_param={client_id_param} handleDownloadImage={handleDownloadImage} />
            {serverResponded ? (
                ratings.length > 0 ? (
                    <>
                        <RadarChart ratings={ratings} />
                        <RatingTable categories={categories} ratings={ratings} handleDelete={handleDelete} />
                    </>
                ) : (
                    <div className="noRatings">
                        <p>This client has no ratings yet.</p>
                    </div>
                )
            ) : (
                <div className="loader"></div>
            )}
        </>
    );
}