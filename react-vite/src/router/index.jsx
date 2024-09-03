import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Home from '../components/Home/Home';
import UserStoreList from '../components/UserStoresList';
import AllStoresList from '../components/AllStoresList/AllStoresList';
import StoreDetails from '../components/StoreDetails';
import CreateAStoreForm from '../components/CreateAStore';
import EditAStore from '../components/EditAStore';
import AllProductsList from '../components/AllProductsList';
import ProductDetials from '../components/ProductDetials';

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
        element: <AllStoresList />,
      },
      {
        path: "/stores/current",
        element: <UserStoreList />,
      },
      {
        path: "/stores/create",
        element: <CreateAStoreForm />,
      },
      {
        path: "/stores/:storeId",
        element: <StoreDetails />,
      },
      {
        path: "/stores/:storeId/edit",
        element: <EditAStore />,
      },
      {
        path: "/products",
        element: <AllProductsList />,
      },
      {
        path: "/products/current",
        element: <h1>current users products</h1>,
      },
      {
        path: "products/:productId",
        element: <ProductDetials />,
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
