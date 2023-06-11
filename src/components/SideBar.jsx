import { Link, useLocation } from "react-router-dom";
import menuIcon from "../assets/icons/menu.svg";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const SideBar = ({ sideBar1, sideBar2 }) => {
    const location = useLocation();
    const activeRouteStyle = "bg-gradient-to-r from-[#EFF54D] to-[#00AC61] bg-clip-text text-transparent font-bold";
    const [sideBar1Link, setSideBar1Link] = useState("/");
    const [sideBar2Link, setSideBar2Link] = useState("/");

    useEffect(() => {
        if (sideBar1 == "My Selected Classes") {
            setSideBar1Link("/dashboard/student/selectedClasses");
        } else if (sideBar1 == "My Classes") {
            setSideBar1Link("/dashboard/instructor/myClasses");
        }

        if (sideBar2 == "My Enrolled Classes") {
            setSideBar2Link("/dashboard/student/enrolledClasses");
        } else if (sideBar2 == "Add A Class") {
            setSideBar2Link("/dashboard/instructor/addAClass");
        }
    }, [sideBar1, sideBar2]);

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
                            <Link className={location.pathname == `${sideBar1Link}` ? activeRouteStyle : ""} to={sideBar1Link}>
                                {sideBar1}
                            </Link>
                        </li>
                        <li>
                            <Link className={location.pathname == `${sideBar2Link}` ? activeRouteStyle : ""} to={sideBar2Link}>
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
