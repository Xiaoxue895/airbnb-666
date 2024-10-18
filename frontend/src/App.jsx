// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

import SpotList from './components/ShowSpot/ShowSpotList';

//差spot detail！！怪不得测试怪怪的

import CreateSpot from './components/SpotFormModal/CreateSpot';
import UpdateSpot from './components/SpotFormModal/UpdateSpot';








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
        element: <div><SpotDetail /></div> //先放这里了
      },
      {
        path: '/spots/new',
        element: <div><CreateSpot /></div>
      },
      {
        path: '/spots/:spotId/update',
        element: <div><UpdateSpot /></div>
      },

    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;