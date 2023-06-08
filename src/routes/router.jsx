import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/Register";
import Login from "../pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
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
