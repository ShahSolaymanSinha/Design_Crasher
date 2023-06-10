import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Instructors from "../pages/Instructors";
import Classes from "../pages/Classes";
import DashBoardPrivetRoute from "../privetRouters/DashBoardPrivetRoute";
import SelectedClasses from "../components/SelectedClasses";

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
            },
            {
                path: "/classes",
                element: <Classes style={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20"}></Classes>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/dashboard",
                element: <DashBoardPrivetRoute></DashBoardPrivetRoute>,
                children: [
                    {
                        path: "/dashboard",
                        element: <SelectedClasses></SelectedClasses>,
                    },
                    {
                        path: "/dashboard/student/selectedClasses",
                        element: <SelectedClasses></SelectedClasses>,
                    },
                    // {
                    //     path: "/dashboard/student/enrolledClasses",
                    //     element: <Classes></Classes>,
                    // },
                ],
            },
        ],
    },
]);

export default router;
