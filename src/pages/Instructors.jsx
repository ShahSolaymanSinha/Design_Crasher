import Instructor from "../components/Instructor";
import { useEffect, useState } from "react";
import { instance } from "../utils/axiosInstance";

const Instructors = () => {
    const [instructors, setInstructors] = useState();

    useEffect(() => {
        instance
            .get("/instructors")
            .then((response) => setInstructors(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {instructors?.map((instructor) => (
                <Instructor key={instructor.name} image={instructor.image} name={instructor.name} email={instructor.email}></Instructor>
            ))}
        </div>
    );
};

export default Instructors;
