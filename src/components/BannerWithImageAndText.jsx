// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

const BannerWithImageAndText = () => {
    return (
        <>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper">
                <SwiperSlide>
                    <div>
                        <img src="" alt="" />
                        <div></div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default BannerWithImageAndText;
