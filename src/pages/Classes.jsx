/* eslint-disable react/prop-types */
import ClassCompo from "../components/ClassCompo";
import { useContext, useEffect } from "react";
import { instance } from "../utils/axiosInstance";
import { AuthContext } from "../providers/AuthProvider";
import { BounceLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

const Classes = ({ style }) => {
    const { user } = useContext(AuthContext);

    const {
        data: classes,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["classesKey"],
        queryFn: async () => {
            const response = await instance.get("/classes");
            return response.data;
        },
    });

    const { data: role } = useQuery({
        queryKey: ["role"],
        queryFn: async () => {
            const response = await instance.post("/getRole", { email: user?.email });
            return response.data;
        },
    });

    useEffect(() => {}, []);

    if (!role) {
        return <BounceLoader className="w-screen h-screen mx-auto my-auto" color="#36d7b7" />;
    }

    if (isLoading) {
        return <BounceLoader className="w-screen h-screen mx-auto my-auto" color="#36d7b7" />;
    }

    if (isError) {
        console.log(error);
    }

    return (
        <div className={`${style}`}>
            {classes?.map((classData) => (
                <ClassCompo
                    key={classData._id}
                    id={classData._id}
                    role={role}
                    user={user}
                    image={classData?.["course-info"]?.["cover-image"]}
                    name={classData?.["course-info"]?.name}
                    instructor={classData?.["instructor-info"]?.name}
                    availableSeats={classData?.["course-info"]?.totalSeats - classData?.["course-info"]?.enrolled}
                    price={classData?.["course-info"]?.price}></ClassCompo>
            ))}
        </div>
    );
};

export default Classes;
