import BannerWithImageAndText from "../components/BannerWithImageAndText";
import Feedback from "../components/Feedback";
import PopularClasses from "../components/PopularClasses";
import PopularInstructors from "../components/PopularInstructors";

const Home = () => {
    return (
        <div>
            <BannerWithImageAndText></BannerWithImageAndText>
            <span className="mt-20 block"></span>
            <PopularClasses></PopularClasses>
            <span className="mt-20 block"></span>
            <PopularInstructors></PopularInstructors>
            <span className="mt-40 block"></span>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;
