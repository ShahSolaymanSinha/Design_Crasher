import { useNavigate } from "react-router-dom";
import notFoundImage from "../assets/notFound.svg";

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/", { replace: true });
        window.location.reload();
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-evenly h-screen bg-gray-100">
            <div>
                <img src={notFoundImage} alt="" />
            </div>

            <div className="text-center">
                <h1 className="text-6xl bg-gradient-to-r from-[#EFF54D] to-[#00AC61] bg-clip-text text-transparent font-bold animate-bounce">404</h1>
                <p className="text-2xl text-gray-700">Page Not Found</p>
                <p className="text-gray-500">The page you are looking for does not exist.</p>
                <br />
                <button onClick={handleGoHome} className="bg-[#00AC61] btn text-white hover:bg-[#ACDB56] hover:text-black">
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
