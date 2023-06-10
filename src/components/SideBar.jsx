import { Link, useLocation } from "react-router-dom";
import menuIcon from "../assets/icons/menu.svg";

// eslint-disable-next-line react/prop-types
const SideBar = ({ sideBar1, sideBar2 }) => {
    const location = useLocation();
    const activeRouteStyle = "bg-gradient-to-r from-[#EFF54D] to-[#00AC61] bg-clip-text text-transparent font-bold";
    return (
        <div className="w-fit">
            <div className="drawer lg:drawer-open relative md:static">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col w-16 lg:hidden absolute left-0 md:static">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden ml z-50">
                        <img src={menuIcon} alt="" />
                    </label>
                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-52 h-full bg-base-200 lg:bg-transparent border-r border-green-500 text-base-content">
                        {/* Sidebar content here */}
                        <li>
                            <Link
                                className={
                                    (location.pathname == "/dashboard" || location.pathname == "/dashboard/student/selectedClasses") && activeRouteStyle
                                }
                                to={"/dashboard/student/selectedClasses"}>
                                {sideBar1}
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={location.pathname == "/dashboard/student/enrolledClasses" && activeRouteStyle}
                                to={"/dashboard/student/enrolledClasses"}>
                                {sideBar2}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
