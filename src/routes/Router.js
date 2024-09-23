import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import Logout from 'src/views/authentication/auth/Logout';
import Quotes from 'src/views/quotes/Quotes';
import QuoteDetails from 'src/views/quotes/QuoteDetails';
import AllPlaces from 'src/views/places/AllPlaces';
import PlaceDetail from 'src/views/places/PlaceDetail';
import EditPlace from 'src/views/places/EditPlace';
import AddPlace from 'src/views/places/AddPlace';
import AllHotels from 'src/views/hotels/AllHotels';
import EditHotel from 'src/views/hotels/EditHotels';
import HotelDetails from 'src/views/hotels/HotelDetail';
import AddHotel from 'src/views/hotels/AddHotel';
import NotificationPage from 'src/pages/NotificationPage';
import Users from 'src/views/users/Users';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/notifications', exact: true, element: <NotificationPage /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '/quotes', exact: true, element: <Quotes /> },
      { path: '/places', exact: true, element: <AllPlaces /> },
      { path: '/hotels', exact: true, element: <AllHotels /> },
      { path: '/places/add', exact: true, element: <AddPlace /> },
      { path: '/hotels/add', exact: true, element: <AddHotel /> },
      { path: '/places/:id', exact: true, element: <PlaceDetail /> },
      { path: '/hotels/:id', exact: true, element: <HotelDetails /> },
      { path: '/places/edit/:id', exact: true, element: <EditPlace /> },
      { path: '/hotels/edit/:id', exact: true, element: <EditHotel /> },
      { path: '/quote/:id', exact: true, element: <QuoteDetails /> },
      { path: '/users', exact: true, element: <Users /> },
      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/logout', element: <Logout /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
