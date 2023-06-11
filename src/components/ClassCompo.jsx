/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import LazyLoadImage from "./LazyLoadImage";

const ClassCompo = ({ id, image, name, instructor, availableSeats, price, role, user }) => {
    const handleSelectClass = () => {
        if (!user) {
            Swal.fire({
                icon: "info",
                title: "Oops...",
                text: "You are not logged in. Please login to select this class",
                confirmButtonColor: "#00AC61",
                iconColor: "#00AC61",
            });
        } else {
            // Get existing data from local storage
            const existingData = localStorage.getItem("SelectedClasses");

            // Merge existing data array and another data
            const mergedData = existingData ? [...JSON.parse(existingData), id] : [id];

            // Set the merged data array to local storage
            localStorage.setItem("SelectedClasses", JSON.stringify(mergedData));
        }
    };

    return (
        <div>
            <div className={`card w-96 bg-base-100 shadow-xl mx-auto h-full ${availableSeats <= 0 && "bg-[#E90064] text-black"}`}>
                <LazyLoadImage src={image} alt={name}></LazyLoadImage>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <div>
                        <p>Instructor: {instructor}</p>
                        <p>Available Seats: {availableSeats}</p>
                    </div>
                    <p className="text-green-400">Price: ${price}</p>
                    <div className="card-actions">
                        <button
                            onClick={handleSelectClass}
                            className={`btn btn-primary w-full bg-[#00AC61] border-none outline-none`}
                            disabled={role == "admin" || role == "instructor" || availableSeats <= 0 ? true : false}>
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCompo;
