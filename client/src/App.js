import Layout from './components/Layout';
import ClientList from './components/ClientList';
import NewClientForm from './components/NewClientForm';
import EditClientForm from './components/EditClientForm';
import NewRatingForm from './components/NewRatingForm';
import EditRatingForm from './components/EditRatingForm';
import RatingList from './components/RatingsList';
import Login from './components/Login';
import { getIsLoggedIn } from './frontEndFuncs/miscFuncs';

import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userName, setUserName] = useState('');

  const router = createBrowserRouter([
    {
      element: <Layout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} userName={userName} />,
      children:
        [
          {
            path: "*",
            element: <ClientList />,
          }, {
            path: "/addClient",
            element: <NewClientForm />,
          }, {
            path: "/editClient/:client_id_param",
            element: <EditClientForm />,
          }, {
            path: "/clients",
            element: <ClientList />,
          }, {
            path: "/ratings/:client_id_param",
            element: <RatingList />,
          }, {
            path: "/editRating/:rating_id_param",
            element: <EditRatingForm />,
          }, {
            path: "/addRating/:client_id_param",
            element: <NewRatingForm />,
          }
        ]
    }
  ]);

  useEffect(() => {
    getIsLoggedIn()
      .then((res) => {
        if (res && res.loggedIn && res.username) {
          setIsLoggedIn(res.loggedIn)
          setUserName(res.username)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
