import { useContext, useState } from "react";
import feedbackImage from "../assets/feedback.svg";
import { ThemeContext } from "../providers/ThemeProvider";
import blob02 from "../assets/blob-2.svg";
import blob03 from "../assets/blob-3.svg";
import blob04 from "../assets/blob-4.svg";
import { Link } from "react-router-dom";
import { Slide } from "react-awesome-reveal";

const Feedback = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [userEmail, setUserEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    return (
        <div className="flex flex-cols md:flex-row justify-between items-center gap-20 relative md:static">
            <Slide duration={1000} direction="left" className="w-full md:w-1/2 opacity-30 md:opacity-100">
                <img src={feedbackImage} alt="Right Place Image" />
            </Slide>
            <Slide duration={1000} direction="right" className="w-full md:w-1/2 absolute md:relative text-center md:text-left my-auto">
                <div>
                    <h1 className={`text-4xl md:text-5xl lg:text-6xl ${isDarkMode && "text-white"}`}>
                        Feel Free To Give Feedback
                        <span className={`text-[#D31A50] ${isDarkMode && "text-[#FF3C83]"}`}>.</span>
                    </h1>
                    <p className={`text-gray-700 ${isDarkMode && "text-white"}`}>An engaging platform that values your opinions!</p>

                    <div>
                        <form>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input
                                onChange={(e) => setUserEmail(e.target.value)}
                                type="text"
                                id="email"
                                className="bg-[#EDF2F6] w-full h-10 rounded-md text-[#22CB5C] p-1 mb-5"
                                required
                            />
                            <br />

                            <label htmlFor="user-feedback">Write down you opinion</label>
                            <textarea
                                onChange={(e) => setFeedback(e.target.value)}
                                name="user-feedback"
                                id="user-feedback"
                                cols="30"
                                rows="5"
                                className="bg-[#EDF2F6] w-full rounded-md text-[#22CB5C] p-1"
                                required></textarea>

                            <button className="w-full" type="submit">
                                <Link
                                    className={`w-full btn text-center mt-5 bg-gradient-to-r from-[#EFF54D] to-[#00AC61] ${isDarkMode && "text-black"}`}
                                    to={`mailto:mdsinhaex4@gmail.com?subject=Feedback_From_${userEmail}&body=${feedback || ""}`}>
                                    Send E-Mail
                                </Link>
                            </button>
                        </form>
                    </div>

                    <img width={200} className="absolute -top-36 right-0 -z-10 opacity-50 hidden lg:block" src={blob02} alt="" />
                    <img width={200} className="absolute -top-64 -left-32 -z-10 opacity-50 hidden lg:block" src={blob03} alt="" />
                    <img width={200} className="absolute -z-10 opacity-50 hidden lg:block" src={blob04} alt="" />
                </div>
            </Slide>
        </div>
    );
};

export default Feedback;
