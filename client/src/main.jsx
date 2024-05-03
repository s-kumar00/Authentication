import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardLayout from "./Admin/DashboardLayout";
import DashBoard from "./Admin/DashBoard";
import UploadItems from "./Admin/UploadItems";
import ManageItems from "./Admin/ManageItems";
import EditItems from "./Admin/EditItems";
import Auth from "./PopUpModel/Auth.jsx";
import ForgetPassword from "./PopUpModel/ForgetPassword.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoute from "./Api/PrivateRoute.jsx";
import EditUserProfile from "./components/EditUserProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Auth />,
      },
      {
        path: "/login/edit-profile",
        element: <EditUserProfile />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadItems />,
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageItems />,
      },
      {
        path: "/admin/dashboard/edit/:id",
        element: <EditItems />,
        loader: async ({ params }) => {
          const data = await fetch(`http://localhost:8000/book/${params.id}`);
          const res = await data.json();
          return res;
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <RouterProvider router={router} />
      <ToastContainer />
    </PersistGate>
  </Provider>
);
