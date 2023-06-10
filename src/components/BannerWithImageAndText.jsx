/* eslint-disable react-hooks/exhaustive-deps */
import { Swiper, SwiperSlide } from "swiper/react";
import { Slide } from "react-awesome-reveal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";

import { useContext, useRef } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

import rightPlaceImage from "../assets/right-place.svg";
import designersCommunity from "../assets/designer-community.svg";
import designingTools from "../assets/designer-tools.svg";
import progressTracker from "../assets/progress-tracking.svg";
import personalGoal from "../assets/personal-goals.svg";

import blob02 from "../assets/blob-2.svg";
import blob03 from "../assets/blob-3.svg";
import blob04 from "../assets/blob-4.svg";
import { instance } from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { BounceLoader } from "react-spinners";

const BannerWithImageAndText = () => {
    const { isDarkMode } = useContext(ThemeContext);

    const {
        data: bannerData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["bannerDataKey"],
        queryFn: async () => {
            const response = await instance.get("/bannerData");
            return response.data;
        },
    });

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty("--progress", 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    if (isLoading) {
        return <BounceLoader className="w-screen h-screen mx-auto my-auto" color="#36d7b7" />;
    }

    if (isError) {
        console.log(error);
    }

    return (
        <Slide direction="left" duration={1500} cascade>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                className="mySwiper">
                {bannerData?.map((banner) => {
                    let bannerImage;
                    if (banner.headerText == "You are in right place") {
                        bannerImage = rightPlaceImage;
                    } else if (banner.headerText == "We have best Designer community") {
                        bannerImage = designersCommunity;
                    } else if (banner.headerText == "Learn trending designing tools") {
                        bannerImage = designingTools;
                    } else if (banner.headerText == "Stick on track with our progress tracker") {
                        bannerImage = progressTracker;
                    } else {
                        bannerImage = personalGoal;
                    }
                    return (
                        <SwiperSlide key={banner.headerText} className="px-10 pt-5 sm:pt-0 md:pt-0 my-auto">
                            <div className="flex flex-cols md:flex-row justify-between items-center gap-20 relative md:static">
                                <img src={bannerImage} alt="Right Place Image" className="w-full md:w-1/2 opacity-30 md:opacity-100" />
                                <div className="w-full md:w-1/2 absolute md:relative text-center md:text-left my-auto">
                                    <h1 className={`text-4xl md:text-5xl lg:text-6xl ${isDarkMode && "text-white"}`}>
                                        {banner.headerText}
                                        <span className={`text-[#D31A50] ${isDarkMode && "text-[#FF3C83]"}`}>.</span>
                                    </h1>
                                    <p className={`text-gray-700 ${isDarkMode && "text-white"}`}>{banner.description}</p>

                                    <img width={200} className="absolute -top-36 right-0 -z-10 opacity-50 hidden lg:block" src={blob02} alt="" />
                                    <img width={200} className="absolute -top-64 -left-32 -z-10 opacity-50 hidden lg:block" src={blob03} alt="" />
                                    <img width={200} className="absolute -z-10 opacity-50 hidden lg:block" src={blob04} alt="" />
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}

                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </Slide>
    );
};

export default BannerWithImageAndText;
