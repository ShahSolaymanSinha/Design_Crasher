import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const AdminDashboard = () => {
    return (
        <div className="flex">
            <Navigate to={"/dashboard/admin/manageUsers"}></Navigate>
            <SideBar sideBar1={"Manage Users"} sideBar2={"Manage Classes"}></SideBar>

            <div className="w-full">
                <h1 className="text-6xl text-[#4FBB5C] text-center">Admin Dashboard</h1>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AdminDashboard;
