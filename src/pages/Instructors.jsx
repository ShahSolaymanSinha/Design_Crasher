import Instructor from "../components/Instructor";
import { BounceLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

const Instructors = () => {
	const {
		data: instructors,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["allInstructorsKey"],
		queryFn: async () => {
			const response = await fetch("https://a12-server-side-livid.vercel.app/instructors").then(res => res.json());
			return response;
		},
	});

	if (isLoading) {
		return (
			<BounceLoader
				className="w-screen h-screen mx-auto my-auto"
				color="#36d7b7"
			/>
		);
	}

	if (isError) {
		console.log(error);
	}

	console.log(instructors);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
			{instructors?.map(instructor => (
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
