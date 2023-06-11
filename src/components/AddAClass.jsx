import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthProvider";
import { ThemeContext } from "../providers/ThemeProvider";

const AddAClass = () => {
    const { user } = useContext(AuthContext);
    const { isDarkMode } = useContext(ThemeContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = ({ className, classImage, availableSeats, price }) => {
        const classData = {
            className,
            classImage,
            availableSeats,
            price,
        };

        console.log(classData);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-transparent rounded shadow-lg mt-5">
            <div className="mb-4">
                <label htmlFor="className" className="block font-semibold">
                    Class Name:
                </label>
                <input
                    type="text"
                    id="className"
                    {...register("className", { required: true })}
                    className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded ${isDarkMode ? "bg-white" : ""}`}
                />
                {errors.className && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="classImage" className="block font-semibold">
                    Class Image:
                </label>
                <input
                    type="text"
                    id="classImage"
                    {...register("classImage", { required: true })}
                    className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded ${isDarkMode ? "bg-white" : ""}`}
                />
                {errors.classImage && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="instructorName" className="block font-semibold">
                    Instructor Name:
                </label>
                <input
                    type="text"
                    id="instructorName"
                    readOnly
                    value={user?.displayName}
                    className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded ${isDarkMode ? "bg-white" : ""}`}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="instructorEmail" className="block font-semibold">
                    Instructor Email:
                </label>
                <input
                    type="email"
                    id="instructorEmail"
                    readOnly
                    value={user?.email}
                    className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded ${isDarkMode ? "bg-white" : ""}`}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="availableSeats" className="block font-semibold">
                    Available Seats:
                </label>
                <input
                    type="number"
                    id="availableSeats"
                    {...register("availableSeats", { required: true })}
                    className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded ${isDarkMode ? "bg-white" : ""}`}
                />
                {errors.availableSeats && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="price" className="block font-semibold">
                    Price:
                </label>
                <input
                    type="number"
                    id="price"
                    {...register("price", { required: true })}
                    className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded ${isDarkMode ? "bg-white" : ""}`}
                />
                {errors.price && <span className="text-red-500">This field is required</span>}
            </div>

            <button type="submit" className="text-white px-4 py-2 rounded font-semibold w-full bg-[#00AC61] hover:bg-primary">
                Add
            </button>
        </form>
    );
};

export default AddAClass;
