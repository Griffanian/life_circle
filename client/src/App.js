import ClientList from './components/ClientList';
import NewClientForm from './components/NewClientForm';
import EditClientForm from './components/EditClientForm';
import NewRatingForm from './components/NewRatingForm';
import EditRatingForm from './components/EditRatingForm';
import RatingList from './components/RatingsList';
import Login from './components/Login';
import { getIsLoggedIn } from './frontEndFuncs/miscFuncs';
import UserDash from './components/UserDash';

import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { useState, useEffect } from 'react';

const router = createBrowserRouter([
  {
    path: "*",
    element: <ClientList />,
  }, {
    path: "addClient",
    element: <NewClientForm />,
  }, {
    path: "editClient/:client_id_param",
    element: <EditClientForm />,
  }, {
    path: "clients",
    element: <ClientList />,
  }, {
    path: "ratings/:client_id_param",
    element: <RatingList />,
  }, {
    path: "editRating/:rating_id_param",
    element: <EditRatingForm />,
  }, {
    path: "addRating/:client_id_param",
    element: <NewRatingForm />,
  }
]);

function App() {
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    console.log(process.env, process.env.REACT_APP_BACKEND_URL)
    getIsLoggedIn()
      .then((res) => {
        if (res && res.loggedIn && res.username) {
          setIsloggedIn(res.loggedIn)
          setUserName(res.username)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    isloggedIn ? (
      <div className='mainBody'>
        <UserDash userName={userName} />
        <RouterProvider router={router} />
      </div>) : (
      <Login setIsloggedIn={setIsloggedIn} />
    )
  );
}

export default App;
