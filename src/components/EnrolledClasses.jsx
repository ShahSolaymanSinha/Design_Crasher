import { useContext } from "react";
import { instance } from "../utils/axiosInstance";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const EnrolledClasses = () => {
    const { user } = useContext(AuthContext);

    const { data: enrolledClasses } = useQuery({
        queryKey: ["enrolledClasses", user?.email],
        queryFn: async () => {
            const response = await instance.get(`/enrolledClasses/${user?.email}`);
            return response.data;
        },
    });
    return (
        <div className=" mt-5 mx-5 gap-20">
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Thumbnail</th>
                            <th>Class Name</th>
                            <th>Date</th>
                            <th>Transaction ID</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledClasses?.map((classData, index) => {
                            return (
                                <tr key={classData._id} style={{ alignItems: "center" }}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <img src={classData?.coverImage} alt="" />
                                    </td>
                                    <td>{classData?.className}</td>
                                    <td>{classData?.date}</td>
                                    <td>{classData?.transactionId}</td>
                                    <td>{classData?.price}</td>
                                    <td>${classData?.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnrolledClasses;
