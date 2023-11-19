import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom";

export default function ClientList() {

    const [clients, setCLients] = useState([])

    const base_url = 'https://circle-of-life.onrender.com'
    const client_url = useMemo(() => new URL('clients/', base_url), [])


    useEffect(() => {
        fetch(client_url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Origin": 'https://griffanian.github.io/'
            },
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setCLients(data.client_list)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log("server is down!!")
            })
    }, [client_url])

    const deleteClient = (e) => {
        e.preventDefault()
        const client_url = new URL(`client/${e.target.value}`, base_url)
        fetch(client_url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Origin": 'https://griffanian.github.io/'
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
            {
                clients.map((client) => {
                    return (
                        <div className="clientDiv" key={client.client_id}>
                            <p>{client.client_id}</p>

                            <Link to={"/ratings/" + client.client_id}>
                                <p>{client.client_name}</p>
                            </Link>
                            <Link to={"/editClient/" + client.client_id}>
                                <button value={client.client_id}>edit client</button>
                            </Link>
                            <button onClick={(e) => deleteClient(e)} value={client.client_id}>delete client</button>
                            <Link to={"/addRating/" + client.client_id}>
                                <button value={client.client_id}>add rating</button>
                            </Link>
                        </div>
                    )
                })
            }
            <Link to={"/addClient"}>
                <button value="add client">add client</button>
            </Link>
        </>
    )
}