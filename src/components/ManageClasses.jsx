import { useQuery } from "@tanstack/react-query";
import { instance } from "../utils/axiosInstance";
import Swal from "sweetalert2";

const ManageClasses = () => {
    const { data: classes, refetch } = useQuery({
        queryKey: ["classes"],
        queryFn: async () => {
            const response = await instance.get("/allClasses");
            console.log(response.data);
            return response.data;
        },
    });

    const handleFeedback = (id, status) => {
        Swal.fire({
            title: "Your Feedback",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Submit",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            preConfirm: async (value) => {
                // Call your API PATCH request here with the entered value
                return instance
                    .patch(`/setFeedback/${id}`, { feedBack: value, status: status })
                    .then((response) => {
                        if (!response.status == 200) {
                            throw new Error(response.statusText);
                        }
                        console.log(response.data);
                        refetch();
                        return response.data;
                    })
                    .catch((error) => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            console.log(result.isConfirmed);
            if (result.isConfirmed) {
                // Show success message
                Swal.fire("Success", "Feedback Submitted Successfully!", "success");
            }
        });
    };

    const handleOnlyFeedback = (id) => {
        Swal.fire({
            title: "Your Feedback",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Submit",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            preConfirm: async (value) => {
                // Call your API PATCH request here with the entered value
                return instance
                    .patch(`/onlyFeedback/${id}`, { feedBack: value })
                    .then((response) => {
                        if (!response.status == 200) {
                            throw new Error(response.statusText);
                        }
                        console.log(response.data);
                        refetch();
                        return response.data;
                    })
                    .catch((error) => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            console.log(result.isConfirmed);
            if (result.isConfirmed) {
                // Show success message
                Swal.fire("Success", "Feedback Submitted Successfully!", "success");
            }
        });
    };

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
                            <th>Instructor Name</th>
                            <th>Instructor Email</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes?.map((classData, index) => {
                            return (
                                <tr key={classData._id} style={{ alignItems: "center" }}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <img src={classData?.courseInfo?.coverImage} alt="" />
                                    </td>
                                    <td>{classData?.courseInfo?.name}</td>
                                    <td>{classData?.instructorInfo?.name}</td>
                                    <td>{classData?.instructorInfo?.email}</td>
                                    <td>{classData?.["courseInfo"]?.totalSeats - classData?.["courseInfo"]?.enrolled}</td>
                                    <td>${classData?.courseInfo?.price}</td>
                                    <td>{classData?.courseInfo?.status}</td>
                                    <td className="flex gap-3 justify-center items-center">
                                        <button
                                            onClick={() => handleFeedback(classData?._id, "approve")}
                                            className="h-32 md:h-28 lg:h-24"
                                            disabled={classData?.courseInfo?.status == "published" ? true : false}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="green"
                                                className="w-6 h-6">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                                />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() => handleFeedback(classData?._id, "decline")}
                                            disabled={classData?.courseInfo?.status == "published" ? true : false}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="red"
                                                className="w-6 h-6">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </button>

                                        <button onClick={() => handleOnlyFeedback(classData?._id)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="#23C4ED"
                                                className="w-6 h-6">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
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

export default ManageClasses;
