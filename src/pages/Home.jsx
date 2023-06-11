import { useContext } from "react";
import BannerWithImageAndText from "../components/BannerWithImageAndText";
import Feedback from "../components/Feedback";
import PopularClasses from "../components/PopularClasses";
import PopularInstructors from "../components/PopularInstructors";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
    const { logOut } = useContext(AuthContext);
    return (
        <div>
            <BannerWithImageAndText></BannerWithImageAndText>
            <span className="mt-20 block"></span>
            <PopularClasses></PopularClasses>
            <span className="mt-20 block"></span>
            <PopularInstructors></PopularInstructors>
            <span className="mt-40 block"></span>
            <Feedback></Feedback>

            <div className="w-full flex justify-center">
                <button className="btn bg-red-600 mx-auto" onClick={() => logOut()}>
                    LogOut
                </button>
            </div>
        </div>
    );
};

export default Home;
