import { instance } from "../utils/axiosInstance";
import LazyLoadImage from "./LazyLoadImage";
import { BounceLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectedClasses = () => {
    const [selectedClasses, setSelectedClasses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const existingData = localStorage.getItem("SelectedClasses");

        if (existingData) {
            instance
                .post("/getSelectedClass", { selectedClassesId: existingData })
                .then((res) => {
                    console.log(res.data);
                    setSelectedClasses(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    if (selectedClasses == []) {
        return <BounceLoader className="w-screen h-screen mx-auto my-auto" color="#36d7b7" />;
    }

    const handlePay = (selectedClass) => {
        navigate("/payment", { state: { selectedClass: selectedClass } });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-5 mx-5 gap-20">
            {selectedClasses?.map((singleClass) => {
                return (
                    <div key={singleClass?._id}>
                        <div className={`card w-80 bg-base-100 shadow-xl mx-auto h-full`}>
                            <LazyLoadImage src={singleClass?.["courseInfo"]?.["coverImage"]} alt={singleClass?.["courseInfo"]?.name}></LazyLoadImage>
                            <div className="card-body">
                                <h2 className="card-title">{singleClass?.["courseInfo"]?.name}</h2>
                                <div>
                                    <p>Instructor: {singleClass?.["instructorInfo"]?.name}</p>
                                    <p>Available Seats: {singleClass?.["courseInfo"]?.totalSeats - singleClass?.["courseInfo"]?.enrolled}</p>
                                </div>
                                <p className="text-green-400">Price: {singleClass?.["courseInfo"]?.price}</p>
                                <div className="card-actions">
                                    <button
                                        onClick={() => handlePay(singleClass)}
                                        className={`btn btn-primary w-full bg-[#00AC61] border-none outline-none`}>
                                        Pay
                                    </button>
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
