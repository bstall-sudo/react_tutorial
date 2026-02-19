import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import About from "./components/About.jsx";

import Login from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import Home from "./components/Home.jsx";
import Firings from "./components/Firings.jsx";
import Passes from "./components/Passes.jsx";

import ErrorPage from "./components/ErrorPage.jsx";
import CheckInOut from "./components/CheckInOut.jsx";
import ProductDetail from "./components/ProductDetail.jsx";

import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminHeader from "./components/admin/AdminHeader.jsx";
import AdminFooter from "./components/admin/AdminFooter.jsx";
import AdminUsers from "./components/admin/AdminRegisterUsers.jsx";

const routeDefinitions = createRoutesFromElements(
  <>
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="firings" element={<Firings />} />
      <Route path="passes" element={<Passes />} />
      <Route path="checkInOut" element={<CheckInOut />} />
      <Route path="login" element={<Login />} />
      <Route path="cart" element={<Cart />} />
      <Route path="products/:productId" element={<ProductDetail />} />
    </Route>

    <Route path="/admin" element={<AdminLayout />} errorElement={<ErrorPage />}>

      <Route path="users" element={<AdminUsers />} />
     
    </Route>
  </>
);

const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
);
