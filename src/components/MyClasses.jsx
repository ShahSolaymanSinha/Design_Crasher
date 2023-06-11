import { useQuery } from "@tanstack/react-query";
import { instance } from "../utils/axiosInstance";
import LazyLoadImage from "./LazyLoadImage";
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-5 mx-5 gap-20">
            {myClasses?.map((myClass) => {
                return (
                    <div key={myClass._id}>
                        <div className={`card w-80 bg-base-100 shadow-xl mx-auto h-full`}>
                            <LazyLoadImage src={myClass?.["courseInfo"]?.["coverImage"]} alt={myClass?.["courseInfo"]?.name}></LazyLoadImage>
                            <div className="card-body">
                                <h2 className="card-title">{myClass?.["courseInfo"]?.name}</h2>
                                <div>
                                    <p>Instructor: {myClass?.["instructorInfo"]?.name}</p>
                                    <p>Available Seats: {myClass?.["courseInfo"]?.totalSeats - myClass?.["courseInfo"]?.enrolled}</p>
                                </div>
                                <p className="text-green-400">Price: {myClass?.["courseInfo"]?.price}</p>
                                <div className="card-actions">
                                    <button className={`btn btn-primary w-full bg-[#00AC61] border-none outline-none`}>Pay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MyClasses;
