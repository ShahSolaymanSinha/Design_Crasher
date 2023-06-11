/* eslint-disable react/prop-types */
import { BounceLoader } from "react-spinners";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const IsStudentPrivetRoute = ({ children }) => {
    const { user, loading, role } = useContext(AuthContext);

    if (loading) {
        return <BounceLoader className="w-screen h-screen mx-auto my-auto" color="#36d7b7" />;
    }
    if (!user) {
        return <Navigate to="/login" replace={true}></Navigate>;
    }

    if (role == "student") {
        return children;
    }
    return <Navigate to={"/"} replace={true}></Navigate>;
};

export default IsStudentPrivetRoute;
