import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getClientList, deleteClient } from "../frontEndFuncs/clientFunc";

const ClientItem = ({ client, onDelete }) => {
    const handleDelete = (event) => {
        event.preventDefault();
        onDelete(client.client_id);
    };

    return (
        <div className="clientDiv" key={client.client_id}>
            <Link to={"/ratings/" + client.client_id}>
                <p>{client.client_name}</p>
            </Link>
            <Link to={"/editClient/" + client.client_id}>
                <button value={client.client_id}>edit client</button>
            </Link>
            <button onClick={handleDelete} value={client.client_id}>
                delete client
            </button>
            <Link to={"/addRating/" + client.client_id}>
                <button value={client.client_id}>add rating</button>
            </Link>
        </div>
    );
};

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        getClientList()
            .then((clients) => setClients(clients))
            .catch((error) => {
                console.error("Error fetching clients:", error);
            });
    }, []);

    const handleDelete = (clientId) => {
        deleteClient(clientId)
            .then((res) => {
                if (res.message === "success") {
                    setClients((prevClients) =>
                        prevClients.filter((client) => client.client_id !== clientId)
                    );
                } else {
                    console.log("Error deleting client");
                }
            })
            .catch((error) => {
                console.error("Error deleting client:", error);
            });
    };

    return (
        <>
            {clients.map((client) => (
                <ClientItem key={client.client_id} client={client} onDelete={handleDelete} />
            ))}
            <Link to={"/addClient"}>
                <button value="add client">add client</button>
            </Link>
        </>
    );
};

export default ClientList;
