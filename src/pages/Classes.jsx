import ClassCompo from "../components/ClassCompo";
import { useEffect, useState } from "react";
import { instance } from "../utils/axiosInstance";

const Classes = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        instance
            .get("/classes")
            .then((response) => setClasses(response.data))
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {classes?.map((classData) => (
                <ClassCompo
                    key={classData._id}
                    image={classData?.["course-info"]?.["cover-image"]}
                    name={classData?.["course-info"]?.name}
                    instructor={classData?.["instructor-info"]?.name}
                    availableSeats={600000 - classData?.["course-info"]?.enrolled}
                    price={classData?.["course-info"]?.price}></ClassCompo>
            ))}
        </div>
    );
};

export default Classes;
