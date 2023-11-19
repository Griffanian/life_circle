import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import RadarChart from './RadarChart';
export default function RatingList() {

    let { client_id_param } = useParams()

    const categories = [
        'energy',
        'work/income',
        'partner',
        'children/next_gen',
        'friends',
        'life_attitude',
        'family',
        'intel/acad',
        'giving_back',
        'hobbies',
    ];

    function getBritishDateFormat(item) {
        const date = new Date(item); // Create a Date object with the current date/time
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0, so add 1
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const [ratings, setRatings] = useState([])

    const base_url = 'https://circle-of-life.onrender.com'


    useEffect(() => {
        const rating_url = new URL(`ratings/${client_id_param}`, base_url)
        fetch(rating_url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",

        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setRatings(data.ratings)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log("server is down!!")
            })
    }, [client_id_param])

    const deleteRating = (e) => {
        e.preventDefault()
        const rating_url = new URL(`rating/${e.target.value}`, base_url)
        fetch(rating_url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",

        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    window.location.reload()
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log("server is down!!")
            })
    }

    return (
        <>
            <p>{ratings[0] ? ratings[0]["client_name"] : ""}</p>
            {ratings.length > 0 ? <RadarChart ratings={ratings} /> : ""}
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

                            <button onClick={(e) => deleteRating(e)} value={rating.rating_id}>delete rating</button>
                        </div>
                    )
                })
            }
            <Link to={"/addRating/" + client_id_param}>
                <button value="add rating">add rating</button>
            </Link>
            <Link to={"/clients"}>
                <button value="all clients">all clients</button>
            </Link>
        </>
    )
}