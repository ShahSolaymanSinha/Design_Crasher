/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { instance } from "../utils/axiosInstance";
import { BounceLoader } from "react-spinners";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const IsStudentPrivetRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const {
        data: role,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["role", user?.email],
        queryFn: async () => {
            const response = await instance.post("/getRole", { email: user?.email });
            return response.data;
        },
    });

    if (loading) {
        return <BounceLoader className="w-screen h-screen mx-auto my-auto" color="#36d7b7" />;
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

    if (role == "student") {
        return children;
    }
    return <Navigate to={"/"} replace={true}></Navigate>;
};

export default IsStudentPrivetRoute;
