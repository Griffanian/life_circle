import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getClientList } from "../../frontEndFuncs/clientFuncs";
import ClientItem from "./ClientItem";

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