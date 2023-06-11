/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "animate.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper";
import { ThemeContext } from "../providers/ThemeProvider";
import { instance } from "../utils/axiosInstance";
import { Slide } from "react-awesome-reveal";
import LazyLoadImage from "./LazyLoadImage";
import { useQuery } from "@tanstack/react-query";
import { BounceLoader } from "react-spinners";

const PopularClasses = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [slidesPerViewCustom, setSlidesPerViewCustom] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);

    const {
        data: classesData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["classesDataKey"],
        queryFn: async () => {
            const response = await instance.get("/popularClasses");
            return response.data;
        },
    });

    useEffect(() => {
        if (screenWidth < 640) {
            setSlidesPerViewCustom(1);
        } else if (screenWidth <= 768) {
            setSlidesPerViewCustom(1);
        } else if (screenWidth <= 1024) {
            setSlidesPerViewCustom(2);
        } else {
            setSlidesPerViewCustom(3);
        }
    }, [screenWidth]);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isLoading) {
        return <BounceLoader className="w-screen h-screen mx-auto my-auto" color="#36d7b7" />;
    }

    if (isError) {
        console.log(error);
    }

    return (
        <div>
            <div>
                <h1 className="text-6xl text-center mb-5 text-[#50BB5D]">
                    Our Popular Classes<span className={`text-[#D31A50] ${isDarkMode && "text-[#FF3C83]"}`}>.</span>
                </h1>
            </div>
            <Slide direction="right" duration={1000}>
                <div className="mx-2">
                    <Swiper
                        slidesPerView={slidesPerViewCustom}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper">
                        {classesData?.slice(0, 6).map((classData) => {
                            return (
                                <SwiperSlide className="my-7" key={classData?.["courseInfo"]?.["name"]}>
                                    <div className={`card ${screenWidth < 640 ? "w-92" : "w-96"} bg-base-100 shadow-xl h-full`}>
                                        <LazyLoadImage
                                            src={classData?.["courseInfo"]?.["coverImage"]}
                                            alt={classData?.["courseInfo"]?.["name"]}></LazyLoadImage>
                                        <div className="card-body">
                                            <div>
                                                <h2 className="card-title">{classData?.["courseInfo"]?.["name"]}</h2>
                                                <p>{classData?.["courseInfo"]?.["description"]}</p>
                                            </div>
                                            <div className="card-actions">
                                                <button className={`btn btn-primary w-full ${isDarkMode && "bg-[#00AC61]"} outline-none border-none`}>
                                                    Enroll Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </Slide>
        </div>
    );
};

export default PopularClasses;
