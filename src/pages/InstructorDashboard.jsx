import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const InstructorDashboard = () => {
    return (
        <div className="flex">
            <Navigate to={"/dashboard/instructor/myClasses"}></Navigate>
            <SideBar sideBar1={"My Classes"} sideBar2={"Add A Class"}></SideBar>

            <div className="w-full">
                <h1 className="text-6xl text-[#4FBB5C] text-center">Instructor Dashboard</h1>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default InstructorDashboard;
