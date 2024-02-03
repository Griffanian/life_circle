import { Link } from "react-router-dom"
import { getInitials } from "../frontEndFuncs/miscFuncs"
export default function RatingListHeader({ navigate, clientName, client_id_param, handleDownloadImage }) {
    return (
        <div className="ratingListHeader">
            <div>
                <a onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left-long"></i></a>
                <h1>Client Ratings</h1>
                <Link to={`/addRating/${client_id_param}`}>
                    <div className="ratingIcons">
                        <i className="fa-solid fa-circle-plus"></i>
                    </div>
                </Link>
                <div onClick={(e) => handleDownloadImage(e)} className="ratingIcons">
                    <i className="fa-solid fa-download"></i>
                </div>
            </div>
            {clientName && (
                <Link to={`/editClient/${client_id_param}`}>
                    <button>
                        {getInitials(clientName)}
                        <i className="fa-solid fa-pen"></i>
                    </button>
                </Link>
            )}
        </div>)
};