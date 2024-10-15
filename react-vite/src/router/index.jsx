/** @format */

import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import Home from "../components/Home/Home";
import UserStoreList from "../components/UserStoresList";
import AllStoresList from "../components/AllStoresList/AllStoresList";
import StoreDetails from "../components/StoreDetails";
import CreateAStoreForm from "../components/CreateAStore";
import EditAStore from "../components/EditAStore";
import AllProductsList from "../components/AllProductsList";
import ProductDetials from "../components/ProductDetials";
import UserProductsList from "../components/UserProductsList";
import CreateAProductForm from "../components/CreateAProduct";
import EditAProduct from "../components/EditAProduct";
import About from "../components/Contact";
import Contact from "../components/Contact";

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
        element: <UserProductsList />,
      },
      {
        path: "products/create",
        element: <CreateAProductForm />,
      },
      {
        path: "products/:productId",
        element: <ProductDetials />,
      },
      {
        path: "products/:productId/edit",
        element: <EditAProduct />,
      },
      {
        path: "/user/current",
        element: (
          <h1 style={{ width: "100%", textAlign: "center" }}>
            Page Under Contruction
          </h1>
        ),
      },
      {
        path: "/user/:userId",
        element: (
          <h1 style={{ width: "100%", textAlign: "center" }}>
            Page Under Contruction
          </h1>
        ),
      },
      {
        path: "/about",
        element: (
          <h1 style={{ width: "100%", textAlign: "center" }}>
            Page Under Contruction
          </h1>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
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
