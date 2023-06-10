import { useForm } from "react-hook-form";
import loginImage from "../assets/login.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import googleIcon from "../assets/icons/google.svg";
import githubIcon from "../assets/icons/github.svg";
import eyeOpenIcon from "../assets/icons/eye-open.svg";
import eyeCloseIcon from "../assets/icons/eye-close.svg";
import { motion } from "framer-motion";
import { AuthContext } from "../providers/AuthProvider";
import { instance } from "../utils/axiosInstance";
import Swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate();
    const { signInWithGoogle, signInWithGithub, signIn } = useContext(AuthContext);

    const { register, handleSubmit } = useForm();
    const { isDarkMode } = useContext(ThemeContext);
    const [isEyeOpen, setIsEyeOpen] = useState(false);

    const handleGoogleLoginIn = () => {
        signInWithGoogle()
            .then((result) => {
                const loggedInUser = result.user;
                const data = {
                    uid: loggedInUser.uid,
                    name: loggedInUser.displayName,
                    email: loggedInUser.email,
                    emailVerified: loggedInUser.emailVerified,
                    photo: loggedInUser.photoURL,
                    role: "student",
                };

                instance
                    .post("/saveUser", data)
                    .then((res) => console.log(res.data))
                    .catch((error) => console.log(error));

                navigate("/", { replace: true });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleGithubLogIn = () => {
        signInWithGithub()
            .then((result) => {
                const loggedInUser = result.user;
                const data = {
                    uid: loggedInUser.uid,
                    name: loggedInUser.displayName,
                    email: loggedInUser.email,
                    emailVerified: loggedInUser.emailVerified,
                    photo: loggedInUser.photoURL,
                    role: "student",
                };

                instance
                    .post("/saveUser", data)
                    .then((res) => console.log(res.data))
                    .catch((error) => console.log(error));

                navigate("/", { replace: true });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onSubmit = (data) => {
        const { email, password } = data;
        signIn(email, password).catch((error) => {
            console.log(error.message);
            if (error.message == "Firebase: Error (auth/wrong-password).") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Wrong Password",
                });
            }

            if (error.message == "Firebase: Error (auth/user-not-found).") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "User Doesn't Exists",
                });
            }
        });
    };
    return (
        <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="h-screen w-full flex justify-between items-center gap-20">
                <div className="w-1/2 hidden md:block">
                    <img className="mx-auto" src={loginImage} alt="" />
                </div>

                <div className="flex flex-col w-full md:w-1/2">
                    <form className={`w-11/12 md:w-3/5 mx-auto`} onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-3xl text-center font-bold mb-5">Sign In to Design Crasher</h1>
                        <div className="flex gap-5 justify-center w-1/2 mx-auto mb-10">
                            <Link onClick={handleGoogleLoginIn}>
                                <img width={32} src={googleIcon} alt="" />
                            </Link>
                            <Link onClick={handleGithubLogIn}>
                                <img width={32} src={githubIcon} alt="" />
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
        </motion.div>
    );
};

export default Login;
