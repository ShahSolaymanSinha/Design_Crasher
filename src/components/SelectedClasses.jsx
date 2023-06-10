import { instance } from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import LazyLoadImage from "./LazyLoadImage";
import { BounceLoader } from "react-spinners";

const SelectedClasses = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["studentDashboardSelectedClasses"],
        queryFn: async () => {
            const existingData = localStorage.getItem("SelectedClasses");
            const response = await instance.post("/getSelectedClass", { selectedClassesId: existingData });
            return response.data;
        },
    });

    if (isLoading) {
        return <BounceLoader className="w-screen h-screen mx-auto my-auto" color="#36d7b7" />;
    }

    if (isError) {
        console.log(error);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-5 gap-20">
            {data?.map((singleClass) => {
                return (
                    <div key={singleClass._id}>
                        <div className={`card w-80 bg-base-100 shadow-xl mx-auto h-full`}>
                            <LazyLoadImage src={singleClass?.["course-info"]?.["cover-image"]} alt={singleClass?.["course-info"]?.name}></LazyLoadImage>
                            <div className="card-body">
                                <h2 className="card-title">{singleClass?.["course-info"]?.name}</h2>
                                <div>
                                    <p>Instructor: {singleClass?.["instructor-info"]?.name}</p>
                                    <p>Available Seats: {singleClass?.["course-info"]?.totalSeats - singleClass?.["course-info"]?.enrolled}</p>
                                </div>
                                <p className="text-green-400">Price: {singleClass?.["course-info"]?.price}</p>
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

export default SelectedClasses;
