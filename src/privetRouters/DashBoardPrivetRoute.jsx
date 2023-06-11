import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import AdminDashboard from "../pages/AdminDashboard";
import InstructorDashboard from "../pages/InstructorDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import { BounceLoader } from "react-spinners";
import { Navigate } from "react-router-dom";

const DashBoardPrivetRoute = () => {
    const { user, loading, role } = useContext(AuthContext);

    if (loading) {
        return <BounceLoader className="w-screen h-screen mx-auto my-auto" color="#36d7b7" />;
    }
    if (!user) {
        return <Navigate to="/login" replace={true}></Navigate>;
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
};

export default DashBoardPrivetRoute;
