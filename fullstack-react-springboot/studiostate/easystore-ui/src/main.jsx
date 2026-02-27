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
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartProvider } from "./store/cart-context.jsx";

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
import { registerUserAction } from "./components/admin/AdminRegisterUser.jsx";
import { createPassAction } from "./components/admin/AdminCreatePass.jsx";
import AdminRegisterUser from "./components/admin/AdminRegisterUser.jsx";
import AdminCreatePass from "./components/admin/AdminCreatePass.jsx";

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
      <Route
        path="users/register"
        element={<AdminRegisterUser />}
        action={registerUserAction}
      />

      <Route
        path="passes/create"
        element={<AdminCreatePass />}
        action={createPassAction}
      />
    </Route>
  </>,
);

const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={appRouter} />
    </CartProvider>
       {" "}
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable
      pauseOnHover
      theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
      transition={Bounce}
    />
  </StrictMode>,
);
