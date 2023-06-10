import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const StudentDashboard = () => {
    console.log(location.pathname);
    return (
        <div className="flex">
            <Navigate to={"/dashboard/student/selectedClasses"}></Navigate>
            <SideBar sideBar1={"My Selected Classes"} sideBar2={"My Enrolled Classes"}></SideBar>

            <div className="w-full">
                <h1 className="text-6xl text-[#4FBB5C] text-center">Student Dashboard</h1>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default StudentDashboard;
