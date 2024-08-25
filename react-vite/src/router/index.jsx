import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Home from '../components/Home/Home';
import StoresList from '../components/StoresList/StoresList';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/stores",
        element: <StoresList />,
      },
      {
        path: "/stores/current",
        element: <h1>Specific users stores</h1>,
      },
      {
        path: "/stores/:storeId",
        element: <h1>Specific store</h1>,
      },
      {
        path: "/products",
        element: <h1>Products</h1>,
      },
      {
        path: "/products/current",
        element: <h1>current users products</h1>,
      },
      {
        path: "/products/:productId",
        element: <h1>current users products</h1>,
      },
      {
        path: '/user/current',
        element: <h1>Current users profile</h1>
      },
      {
        path: '/user/:userId',
        element: <h1>Specific users profile</h1>
      },
      {
        path: "/about",
        element: <h1>About</h1>,
      },
      {
        path: "/contact",
        element: <h1>Contact</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
