import { useQuery } from "@tanstack/react-query";
import { instance } from "../utils/axiosInstance";
import adminIcon from "../assets/icons/admin.svg";
import instructorIcon from "../assets/icons/instructor.svg";

const ManageUsers = () => {
    const { data: users, refetch } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const response = await instance.get("/allUsers");
            return response.data;
        },
    });

    const handleMakeAdmin = (email) => {
        instance.patch(`/setRoleToAdmin/${email}`).catch((err) => console.log(err));
        refetch();
    };

    const handleMakeInstructor = (email) => {
        instance.patch(`/setRoleToInstructor/${email}`).catch((err) => console.log(err));
        refetch();
    };

    return (
        <div className=" mt-5 mx-5 gap-20">
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verified</th>
                            <th>Role</th>
                            <th>Make Instructor</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => {
                            return (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.emailVerified ? "Yes" : "No"}</td>
                                    <td>{user?.role}</td>
                                    <td>
                                        <button
                                            onClick={() => handleMakeInstructor(user?.email)}
                                            className={`btn btn-primary bg-transparent border-none outline-none w-fit`}
                                            disabled={user?.role == "admin" || user?.role == "instructor" ? true : false}>
                                            <img width={50} src={instructorIcon} alt="" />
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            onClick={() => handleMakeAdmin(user?.email)}
                                            className={`btn btn-primary bg-transparent border-none outline-none w-fit`}
                                            disabled={user?.role == "admin" || user?.role == "instructor" ? true : false}>
                                            <img width={50} src={adminIcon} alt="" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
