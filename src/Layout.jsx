import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { themeChange } from "theme-change";

const Layout = () => {
    useEffect(() => {
        themeChange(false);
        document.documentElement.setAttribute("data-theme", "light");
    }, []);
    return (
        <>
            <Navbar />

            <Outlet />

            <Footer />
        </>
    );
};

export default Layout;
