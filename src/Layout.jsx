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
            <header className="sm:w-full lg:w-4/5 mx-auto">
                <Navbar />
            </header>

            <main className="sm:w-full lg:w-4/5 mx-auto">
                <Outlet />
            </main>

            <footer className="sm:w-full lg:w-4/5 mx-auto">
                <Footer />
            </footer>
        </>
    );
};

export default Layout;
