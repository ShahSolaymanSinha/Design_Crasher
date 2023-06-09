import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Instructors from "../pages/Instructors";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/instructors",
                element: <Instructors></Instructors>,
                loader: () => fetch("http://localhost:5000/instructors"),
            },
            {
                path: "/register",
                element: <Register></Register>,
            },

            {
                path: "/login",
                element: <Login></Login>,
            },
        ],
    },
]);

export default router;
