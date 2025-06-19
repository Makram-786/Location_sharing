import { createBrowserRouter,RouterProvider,Route,Link } from "react-router-dom";
import { createRoot } from "react-dom";
import NewPlace, { fetchPlace, placeFormAction, updatePlaceFormAction } from "./pages/NewPlace";
import AllPlaces, { deletePlaceAction, fetchPlacesLoader } from "./pages/AllPlaces";
import axios from 'axios'
import ErrorPage from "./pages/ErrorPage";
import Login, { loginFormAction } from "./pages/Login";
import SignUp, { signUpFormAction } from "./pages/SignUp";
import MainLayout from "./layout/MainLayout";
import AuthRoute from "./utils/AuthRoute";
function App() {


  const router = createBrowserRouter([
    {
      element: <AuthRoute />, // Check login
      children: [
        {
          element: <MainLayout />, // Add header
          children: [
            {
              path: "/",
              element: <AllPlaces />,
              loader:fetchPlacesLoader,
              action:deletePlaceAction,
              errorElement: <ErrorPage />,
            },
            {
              path: "/new-place",
              element: <NewPlace />,
              action: placeFormAction,
            },
            {
              path: "/update-place/:pid",
              element: <NewPlace />,
              loader:fetchPlace,
              action: updatePlaceFormAction,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      action: loginFormAction,
    },
    {
      path: "/signup",
      element: <SignUp />,
      action: signUpFormAction,
    },
  ]);
 
  return (
    <>
  
    <RouterProvider router={router} />
    </>
  )
}

export default App
