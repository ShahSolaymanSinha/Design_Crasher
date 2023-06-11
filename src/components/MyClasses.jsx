import { useQuery } from "@tanstack/react-query";
import { instance } from "../utils/axiosInstance";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const MyClasses = () => {
    const { user } = useContext(AuthContext);

    const { data: myClasses } = useQuery({
        queryKey: ["myClasses", user?.email],
        queryFn: async () => {
            const response = await instance.get(`/instructorClasses/${user?.email}`);
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
                            <th>Name</th>
                            <th>Enrolled</th>
                            <th>Available Seats</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myClasses?.map((myClass, index) => {
                            return (
                                <tr key={myClass._id}>
                                    <th>{index + 1}</th>
                                    <td>{myClass?.["courseInfo"]?.name}</td>
                                    <td>{myClass?.["courseInfo"]?.enrolled}</td>
                                    <td>{myClass?.["courseInfo"]?.totalSeats - myClass?.["courseInfo"]?.enrolled}</td>
                                    <td>{myClass?.["courseInfo"]?.status}</td>
                                    <td>{myClass?.["courseInfo"]?.price}</td>
                                    <td className="flex gap-2">
                                        {myClass?.courseInfo?.status == "declined" && (
                                            <button className={`btn btn-primary bg-transparent border-none outline-none w-fit`}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                        <button className={`btn btn-primary bg-transparent border-none outline-none w-fit`}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;
