import Instructor from "../components/Instructor";
import { instance } from "../utils/axiosInstance";
import { BounceLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

const Instructors = () => {
    const {
        data: instructors,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["allInstructors"],
        queryFn: async () => {
            const response = await instance.get("/instructors");
            return response.data;
        },
    });

    if (isLoading) {
        return <BounceLoader className="w-screen h-screen mx-auto my-auto" color="#36d7b7" />;
    }

    if (isError) {
        console.log(error);
    }

    // console.log(instructors);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {instructors?.map((instructor) => (
                <Instructor
                    key={instructor.instructorInfo.email}
                    image={instructor.instructorInfo.image}
                    name={instructor.instructorInfo.name}
                    email={instructor.instructorInfo.email}></Instructor>
            ))}
        </div>
    );
};

export default Instructors;
