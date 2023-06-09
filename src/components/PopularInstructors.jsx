/* eslint-disable react-hooks/exhaustive-deps */
import useAxios from "../hooks/useAxios";
import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper";
import { ThemeContext } from "../providers/ThemeProvider";

const PopularInstructors = () => {
    const [instructorsData, setInstructorsData] = useState([]);
    const { isDarkMode } = useContext(ThemeContext);
    const API = useAxios();
    const [slidesPerViewCustom, setSlidesPerViewCustom] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        API.get("/popularInstructors")
            .then((response) => {
                console.log(response.data);
                setInstructorsData(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

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

    return (
        <>
            <div>
                <h1 className="text-6xl text-center mb-5 text-[#50BB5D]">
                    Our Popular Instructors<span className={`text-[#D31A50] ${isDarkMode && "text-[#FF3C83]"}`}>.</span>
                </h1>
            </div>
            <div className="mx-2 my-2">
                <Swiper
                    slidesPerView={slidesPerViewCustom}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper">
                    {instructorsData?.slice(0, 6).map((instructorData) => {
                        return (
                            <SwiperSlide className="my-7" key={instructorData?.["name"]}>
                                <div className={`card ${screenWidth < 640 ? "w-92" : "w-96"} bg-base-100 shadow-xl h-full`}>
                                    <figure>
                                        <img className="w-full" src={instructorData?.["image"]} alt="Shoes" />
                                    </figure>
                                    <div className="card-body">
                                        <div>
                                            <h2 className="card-title">{instructorData?.["name"]}</h2>
                                            <p>{instructorData?.["email"]}</p>
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
        </>
    );
};

export default PopularInstructors;
