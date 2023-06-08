import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <ErrorPage></ErrorPage>,
    },
]);

export default router;
