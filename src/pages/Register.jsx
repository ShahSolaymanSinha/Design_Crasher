import { useForm } from "react-hook-form";
import { ThemeContext } from "../providers/ThemeProvider";
import { useContext, useState } from "react";
import eyeOpenIcon from "../assets/icons/eye-open.svg";
import eyeCloseIcon from "../assets/icons/eye-close.svg";
import { Link } from "react-router-dom";
import registerImage from "../assets/register.svg";
import googleIcon from "../assets/icons/google.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import microsoftIcon from "../assets/icons/microsoft.svg";
import appleIcon from "../assets/icons/apple.svg";
import { motion } from "framer-motion";

const Register = () => {
    const { register, handleSubmit } = useForm();
    const { isDarkMode } = useContext(ThemeContext);
    const [isEyeOpen, setIsEyeOpen] = useState(false);

    const [selectedFileName, setSelectedFileName] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFileName(file.name);
    };

    const truncateStart = (string, maxLength) => {
        if (string.length > maxLength) {
            return "..." + string.slice(-(maxLength - 3));
        }
        return string;
    };

    const onSubmit = (data) => console.log(data);
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }} // Start from the right side (x: 100)
            animate={{ opacity: 1, x: 0 }} // Animate to the default position (x: 0)
            transition={{ duration: 0.5 }}>
            <div className="h-screen w-full flex justify-between items-center gap-20">
                <div className="w-1/2 hidden md:block">
                    <img className="mx-auto" src={registerImage} alt="" />
                </div>

                <div className="flex flex-col w-full md:w-1/2">
                    <form className={`w-11/12 md:w-3/5 mx-auto`} onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-3xl text-center font-bold mb-5">Register to Design Crasher</h1>
                        <div className="flex justify-between w-1/2 mx-auto mb-10">
                            <Link>
                                <img width={32} src={googleIcon} alt="" />
                            </Link>
                            <Link>
                                <img width={32} src={microsoftIcon} alt="" />
                            </Link>
                            <Link>
                                <img width={32} src={appleIcon} alt="" />
                            </Link>
                            <Link>
                                <img width={32} src={facebookIcon} alt="" />
                            </Link>
                        </div>

                        <div className="flex items-center mt-5 mb-5">
                            <div className="flex-grow border-t"></div>
                            <div className="px-4 text-gray-500">Or do it via Email</div>
                            <div className="flex-grow border-t"></div>
                        </div>

                        {/* User Name Input Field */}
                        <label htmlFor="name">Name</label>
                        <br />
                        <input type="text" id="name" {...register("name")} className="bg-[#EDF2F6] w-full h-10 rounded-md text-[#22CB5C] p-1" />
                        <br />

                        <span className="mb-5 block"></span>

                        {/* User Email Input Field */}
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="text" id="email" {...register("email")} className="bg-[#EDF2F6] w-full h-10 rounded-md text-[#22CB5C] p-1" />
                        <br />

                        <span className="mb-5 block"></span>

                        {/* User Password Input Field */}
                        <div className="relative">
                            <label htmlFor="password">Password</label>
                            <input
                                type={isEyeOpen ? "text" : "password"}
                                id="password"
                                {...register("password")}
                                className="bg-[#EDF2F6] w-full h-10 rounded-md text-[#22CB5C] p-1"
                            />
                            <img
                                width={32}
                                onClick={() => setIsEyeOpen(!isEyeOpen)}
                                src={isEyeOpen ? eyeOpenIcon : eyeCloseIcon}
                                alt=""
                                className="absolute top-7 right-2"
                            />
                        </div>

                        <span className="mb-5 block"></span>

                        {/* User Password Input Field */}
                        <div className="relative">
                            <label htmlFor="confirm-password">Password</label>
                            <input
                                type={isEyeOpen ? "text" : "password"}
                                id="confirm-password"
                                {...register("confirm-password")}
                                className="bg-[#EDF2F6] w-full h-10 rounded-md text-[#22CB5C] p-1"
                            />
                            <img
                                width={32}
                                onClick={() => setIsEyeOpen(!isEyeOpen)}
                                src={isEyeOpen ? eyeOpenIcon : eyeCloseIcon}
                                alt=""
                                className="absolute top-7 right-2"
                            />
                        </div>
                        <p>Must be 6 characters at least</p>
                        <br />

                        <div className="flex items-center mb-5">
                            <label
                                htmlFor="image-upload"
                                className="px-4 py-2 bg-gradient-to-r from-[#FF9F4A] to-[#FF3C83] text-white rounded-md cursor-pointer">
                                Upload Image
                            </label>
                            <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            {selectedFileName && <div className="ml-4 text-gray-500">{truncateStart(selectedFileName, 27)}</div>}
                        </div>

                        <div className="flex justify-between">
                            <p>
                                Already Registered?{" "}
                                <Link className="text-[#00AC61]" to={"/login"}>
                                    Login
                                </Link>
                            </p>
                        </div>

                        <button
                            className={`w-full btn text-center mt-5 bg-gradient-to-r from-[#EFF54D] to-[#00AC61] ${isDarkMode && "text-black"}`}
                            type="submit">
                            Register
                        </button>
                    </form>

                    <p className="flex justify-center mt-5">@2023 All Rights Reserved</p>
                </div>
            </div>
        </motion.div>
    );
};

export default Register;
