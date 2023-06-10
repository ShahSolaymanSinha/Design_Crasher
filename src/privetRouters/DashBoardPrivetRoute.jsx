import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { instance } from "../utils/axiosInstance";
import AdminDashboard from "../pages/AdminDashboard";
import InstructorDashboard from "../pages/InstructorDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import { BounceLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const DashBoardPrivetRoute = () => {
    const { user, loading } = useContext(AuthContext);

    const {
        data: role,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["dashboardRoleKey", user?.email],
        queryFn: async () => {
            const response = await instance.post("/getRole", { email: user?.email });
            return response.data;
        },
    });

    if (loading) {
        return <BounceLoader className="w-screen h-screen mx-auto my-auto" color="#36d7b7" />;
    }

    if (role == "admin") {
        return <AdminDashboard></AdminDashboard>;
    }

    if (role == "instructor") {
        return <InstructorDashboard></InstructorDashboard>;
    }

    if (role == "student") {
        return <StudentDashboard></StudentDashboard>;
    }

    if (!user) {
        return <Navigate to="/login" replace={true}></Navigate>;
    }

    if (isLoading) {
        return <BounceLoader className="w-screen h-screen mx-auto my-auto" color="#36d7b7" />;
    }

    if (isError) {
        console.log(error);
    }
};

export default DashBoardPrivetRoute;
