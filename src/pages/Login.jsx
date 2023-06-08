import { useForm } from "react-hook-form";
import loginImage from "../assets/login.svg";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import googleIcon from "../assets/icons/google.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import microsoftIcon from "../assets/icons/microsoft.svg";
import appleIcon from "../assets/icons/apple.svg";
import eyeOpenIcon from "../assets/icons/eye-open.svg";
import eyeCloseIcon from "../assets/icons/eye-close.svg";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { isDarkMode } = useContext(ThemeContext);
    const [isEyeOpen, setIsEyeOpen] = useState(false);

    const onSubmit = (data) => console.log(data);
    return (
        <div className="h-screen w-full flex justify-between items-center gap-20">
            <div className="w-1/2 hidden md:block">
                <img className="mx-auto" src={loginImage} alt="" />
            </div>

            <div className="flex flex-col w-full md:w-1/2">
                <form className={`w-11/12 md:w-3/5 mx-auto`} onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-3xl text-center font-bold mb-5">Sign In to Design Crasher</h1>
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

                    <label htmlFor="email">Email</label>
                    <br />

                    <input type="text" id="email" {...register("email")} className="bg-[#EDF2F6] w-full h-10 rounded-md text-[#22CB5C] p-1" />
                    <br />

                    <span className="mb-5 block"></span>

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
                    <p>Must be 6 characters at least</p>
                    <br />

                    <div className="flex justify-between">
                        <p>
                            New User?{" "}
                            <Link className="text-[#00AC61]" to={"/register"}>
                                Register
                            </Link>
                        </p>

                        <p>
                            <Link className="text-[#00AC61]">Forgot Password?</Link>
                        </p>
                    </div>

                    <button
                        className={`w-full btn text-center mt-5 bg-gradient-to-r from-[#EFF54D] to-[#00AC61] ${isDarkMode && "text-black"}`}
                        type="submit">
                        Login
                    </button>
                </form>

                <p className="flex justify-center mt-5">@2023 All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Login;
