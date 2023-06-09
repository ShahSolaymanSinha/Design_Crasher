import BannerWithImageAndText from "../components/BannerWithImageAndText";
import PopularClasses from "../components/PopularClasses";

const Home = () => {
    return (
        <div>
            <BannerWithImageAndText></BannerWithImageAndText>
            <span className="mt-20 block"></span>
            <PopularClasses></PopularClasses>
        </div>
    );
};

export default Home;
