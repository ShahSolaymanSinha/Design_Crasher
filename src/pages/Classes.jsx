/* eslint-disable react/prop-types */
import ClassCompo from "../components/ClassCompo";
import { useContext } from "react";
import { instance } from "../utils/axiosInstance";
import { AuthContext } from "../providers/AuthProvider";
import { BounceLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

const Classes = ({ style }) => {
    const { user, role } = useContext(AuthContext);

    const {
        data: classes,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["classes"],
        queryFn: async () => {
            const response = await instance.get("/classes");
            return response.data;
        },
    });

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
                    image={classData?.["courseInfo"]?.["coverImage"]}
                    name={classData?.["courseInfo"]?.name}
                    instructor={classData?.["instructorInfo"]?.name}
                    availableSeats={classData?.["courseInfo"]?.totalSeats - classData?.["courseInfo"]?.enrolled}
                    price={classData?.["courseInfo"]?.price}></ClassCompo>
            ))}
        </div>
    );
};

export default Classes;
