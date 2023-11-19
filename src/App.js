import ClientList from './components/ClientList';
import NewClientForm from './components/NewClientForm';
import EditClientForm from './components/EditClientForm';
import NewRatingForm from './components/NewRatingForm';
import EditRatingForm from './components/EditRatingForm';
import RatingList from './components/RatingsList';

import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
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
  return (
    <div className='mainBody'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
