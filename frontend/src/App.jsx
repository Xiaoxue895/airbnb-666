// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

import SpotList from './components/ShowSpot/ShowSpotList';
import SpotDetail from './components/ShowSpot/ShowSpotDetail';

import ManageSpot from './components/SpotFormModal/ManageSpot';
import CreateSpot from './components/SpotFormModal/CreateSpot';
import UpdateSpot from './components/SpotFormModal/UpdateSpot';

import ManageReview from './components/ReviewFormModal/ManageReview'



// don't need change this part

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      // console.log('user restored')
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}




// need add some routes here

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <div><SpotList /></div>
      },
      {
        path: '/spots/:spotId',
        element: <div><SpotDetail /></div> 
      },
      {
        path: '/spots/current',
        element: <div><ManageSpot /></div>
      },
      {
        path: '/spots/new',
        element: <div><CreateSpot /></div>
      },
      {
        path: '/spots/:spotId/update',
        element: <div><UpdateSpot /></div>
      },
      {
        path: '/reviews/current',
        element: <div><ManageReview /></div>
      }

    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;