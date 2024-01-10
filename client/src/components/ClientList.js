import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        <div className="clientDiv" key={client.client_id}>
            <div className="clientInfo">
                <p>{getInitials(client.client_name)}</p>
                <div>
                    <Link to={"/editClient/" + client.client_id}>
                        <button className="editButton" value={client.client_id}>Edit Client</button>
                    </Link>
                    <button className="deleteButton" onClick={handleDelete} value={client.client_id}>
                        Delete Client
                    </button>
                </div>
            </div>
            <div className="clientActions">
                <Link to={"/ratings/" + client.client_id}>
                    <button className="ratingsButton">See Ratings</button>
                </Link>
                <Link to={"/addRating/" + client.client_id}>
                    <button className="addRatingButton" value={client.client_id}>Add Rating</button>
                </Link>
            </div>
        </div>
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
            <div className="clientListContainer">
                {clients.map((client) => (
                    <ClientItem key={client.client_id} client={client}
                        setServerResponded={setServerResponded} setClients={setClients} setError={setError} />
                ))}
                {error ? (<p className="errorMessage">{error}</p>) : null}
                <Link to={"/addClient"}>
                    <button className="addClientButton" value="add client">Add Client</button>
                </Link>
            </div>
        ) : (
            <div className="loader"></div>
        )
    );
};

export default ClientList;
