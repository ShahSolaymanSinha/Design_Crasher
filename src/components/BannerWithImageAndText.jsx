/* eslint-disable react-hooks/exhaustive-deps */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";

import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

import rightPlaceImage from "../assets/right-place.svg";
import designersCommunity from "../assets/designer-community.svg";
import designingTools from "../assets/designer-tools.svg";
import progressTracker from "../assets/progress-tracking.svg";
import personalGoal from "../assets/personal-goals.svg";

import blob02 from "../assets/blob-2.svg";
import blob03 from "../assets/blob-3.svg";
import blob04 from "../assets/blob-4.svg";
import useAxios from "../hooks/useAxios";

const BannerWithImageAndText = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const API = useAxios();
    const [bannerData, setBannerData] = useState([]);

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty("--progress", 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    useEffect(() => {
        API.get("/bannerData")
            .then((response) => {
                setBannerData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <>
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
                        {
                            /* setCurrentImage(rightPlaceImage); */
                        }
                        bannerImage = rightPlaceImage;
                    } else if (banner.headerText == "We have best Designer community") {
                        {
                            /* setCurrentImage(designersCommunity); */
                        }
                        bannerImage = designersCommunity;
                    } else if (banner.headerText == "Learn trending designing tools") {
                        {
                            /* setCurrentImage(designingTools); */
                        }
                        bannerImage = designingTools;
                    } else if (banner.headerText == "Stick on track with our progress tracker") {
                        {
                            /* setCurrentImage(progressTracker); */
                        }
                        bannerImage = progressTracker;
                    } else {
                        {
                            /* setCurrentImage(personalGoal); */
                        }
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
        </>
    );
};

export default BannerWithImageAndText;
