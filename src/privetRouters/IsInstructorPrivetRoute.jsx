/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { BounceLoader } from "react-spinners";
import { Navigate } from "react-router-dom";

const IsInstructorPrivetRoute = ({ children }) => {
    const { user, loading, role } = useContext(AuthContext);

    if (loading) {
        return <BounceLoader className="w-screen h-screen mx-auto my-auto" color="#36d7b7" />;
    }

    if (!user) {
        return <Navigate to="/login" replace={true}></Navigate>;
    }

    if (role == "instructor") {
        return children;
    }
    return <Navigate to={"/"} replace={true}></Navigate>;
};

export default IsInstructorPrivetRoute;
