import { getInitials } from "../frontEndFuncs/miscFuncs";
import { Link } from "react-router-dom";

export default function ClientItem({ client }) {
    return (
        <tr className="clientDiv" key={client.client_id}>
            <td>
                <div className="clientData">
                    <p>{getInitials(client.client_name)}</p>
                    <div className="clientIcons">
                        <Link to={"/editClient/" + client.client_id}>
                            <i className="fa-solid fa-pen"></i>
                        </Link>
                    </div>
                </div>
            </td>
            <td>
                <div className="ratingData">
                    <Link to={"/ratings/" + client.client_id}>Ratings</Link>
                </div>
            </td>
        </tr >
    );
};