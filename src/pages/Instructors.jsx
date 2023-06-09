import { useLoaderData } from "react-router-dom";
import Instructor from "../components/Instructor";

const Instructors = () => {
    const instructors = useLoaderData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {instructors.map((instructor) => (
                <Instructor key={instructor.name} image={instructor.image} name={instructor.name} email={instructor.email}></Instructor>
            ))}
        </div>
    );
};

export default Instructors;
