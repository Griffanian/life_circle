import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getClientList, deleteClient } from "../frontEndFuncs/clientFuncs";
import { getInitials } from "../frontEndFuncs/miscFuncs";

const ClientItem = ({ client, setServerResponded, setClients, setError }) => {
    const handleDelete = (event) => {
        event.preventDefault();
        setServerResponded(false);
        deleteClient(client.client_id)
            .then((res) => {
                if (res.message === "success") {
                    setServerResponded(true);
                    setClients((prevClients) =>
                        prevClients.filter((res) => res.client_id !== client.client_id)
                    );
                } else {
                    setError("Error deleting client");
                    setServerResponded(true);
                }
            })
            .catch((error) => {
                setError("Error deleting client: " + error);
            });
    };

    return (
        <tr className="clientDiv" key={client.client_id}>
            <td>
                <div className="clientData">
                    <p>{getInitials(client.client_name)}</p>
                    <div className="clientIcons">
                        <Link to={"/editClient/" + client.client_id}>
                            <i className="fa-solid fa-pen"></i>
                        </Link>
                        {/* <Link onClick={handleDelete}>
                            <i className="fa-solid fa-trash"></i>
                        </Link> */}
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

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [serverResponded, setServerResponded] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        getClientList()
            .then((clients) => {
                setServerResponded(true);
                setClients(clients);
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
            });
    }, []);

    return (
        serverResponded ? (
            <div className='mainBody'>
                <div className="clientListContainer">
                    <div className="clientListHeader">
                        <h1>Manage Clients</h1>
                        <Link to={"/addClient"}>
                            <button className="addClientButton" value="add client">
                                <i className="fa-solid fa-circle-plus"></i>
                                Add Client
                            </button>

                        </Link>
                    </div>
                    <div className="clientsTable">
                        <table>
                            <tbody>
                                {clients.map((client) => (
                                    <ClientItem key={client.client_id} client={client}
                                        setServerResponded={setServerResponded} setClients={setClients} setError={setError} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {error ? (<p className="errorMessage">{error}</p>) : null}
                </div>
            </div>
        ) : (
            <div className="loader"></div>
        )
    );
};

export default ClientList;