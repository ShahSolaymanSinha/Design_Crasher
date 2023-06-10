/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import BounceLoader from "react-spinners/BounceLoader";

const PrivetRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <BounceLoader color="#36d7b7" />;
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" replace={true}></Navigate>;
};

export default PrivetRoute;
