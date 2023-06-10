import { useForm } from "react-hook-form";
import { ThemeContext } from "../providers/ThemeProvider";
import { useContext, useState } from "react";
import eyeOpenIcon from "../assets/icons/eye-open.svg";
import eyeCloseIcon from "../assets/icons/eye-close.svg";
import { Link, useNavigate } from "react-router-dom";
import registerImage from "../assets/register.svg";
import googleIcon from "../assets/icons/google.svg";
import githubIcon from "../assets/icons/github.svg";
import { motion } from "framer-motion";
import { AuthContext } from "../providers/AuthProvider";
import { instance } from "../utils/axiosInstance";
import { app } from "../firebase/firebase.config";

import { getAuth, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
const auth = getAuth(app);

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { isDarkMode } = useContext(ThemeContext);
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState(null);
    const { createUser } = useContext(AuthContext);
    const { signInWithGoogle, signInWithGithub } = useContext(AuthContext);

    // For Image Upload
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
        const file = e.target.files[0];
        setSelectedFileName(file.name);
    };
    // ----------------------------------------------------------------

    const truncateStart = (string, maxLength) => {
        if (string.length > maxLength) {
            return "..." + string.slice(-(maxLength - 3));
        }
        return string;
    };

    // Sign In Methods
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
        const { name, email, password, confirmPassword } = data;
        const passwordTestingRegEx = /^(?=.*[A-Z])(?=.*\W).{6,}$/;

        console.log(data);

        if (!passwordTestingRegEx.test(password) || !passwordTestingRegEx.test(confirmPassword)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You password must have at least 6 character, one capital letter and one special character.",
            });
        } else {
            try {
                // CREATING FORM DATA TO UPLOAD AN IMAGE
                const formData = new FormData();
                formData.append("image", selectedImage);

                if (password == confirmPassword) {
                    // CALLING AN IMG-BB API TO UPLOAD THE IMAGE
                    fetch(`https://api.imgbb.com/1/upload?expiration=600&key=729a3660c3b989ca2e15db51e7491169`, {
                        method: "POST",
                        body: formData,
                    })
                        .then((res) => res.json())
                        .then((imageData) => {
                            // CHECKING IF THE IMAGE UPLOADED SUCCESSFULLY
                            if (imageData.success) {
                                try {
                                    createUser(email, password)
                                        .then((result) => {
                                            const registeredUser = result.user;

                                            // CHECKING IF THE USER REGISTERED SUCCESSFULLY THEN UPDATE THE USER PROFILE
                                            if (registeredUser) {
                                                updateProfile(auth.currentUser, {
                                                    displayName: name,
                                                    photoURL: imageData.data.display_url,
                                                })
                                                    .then(() => console.log("User Information Updated Successfully!"))
                                                    .catch((error) => console.log(error));
                                            }

                                            // CREATING USER DATA TO STORE
                                            const data = {
                                                uid: registeredUser.uid,
                                                name: name,
                                                email: registeredUser.email,
                                                emailVerified: registeredUser.emailVerified,
                                                photo: imageData.data.display_url,
                                            };

                                            // CALLING API TO STORE USER DATA
                                            instance
                                                .post("/saveUser", data)
                                                .then((res) => console.log(res.data))
                                                .catch((error) => console.log(error));

                                            Swal.fire({
                                                icon: "success",
                                                title: "Yeah!",
                                                text: "Your Account Created Successfully",
                                            });
                                        })
                                        .catch((error) => {
                                            if (error.message == "Firebase: Error (auth/email-already-in-use).") {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Oops...",
                                                    text: "Email Already In Use. Please Try With Different Email Or Login",
                                                });
                                            }
                                        });
                                } catch (error) {
                                    console.log("An Error Occurred:", error.message);
                                }
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "We can't upload your image. Please reload the website or select another image",
                                });
                            }
                        })
                        .catch((err) => {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "We can't upload your image. Please reload the website or select another image",
                            });

                            console.log(err);
                        });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Password & Confirm Password Does Not Match",
                    });
                }
            } catch (error) {
                console.log("An Error Occurred: ", error);
            }
        }
    };
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
                        <div className="flex justify-center gap-5 w-1/2 mx-auto mb-10">
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

                        {/* User Name Input Field */}
                        <label htmlFor="name">Name</label>
                        <br />
                        <input
                            required
                            type="text"
                            id="name"
                            {...register("name", { required: true })}
                            className="bg-[#EDF2F6] w-full h-10 rounded-md text-[#22CB5C] p-1"
                        />
                        <br />

                        <span className="mb-5 block"></span>

                        {/* User Email Input Field */}
                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            required
                            type="text"
                            id="email"
                            {...register("email", { required: true })}
                            className="bg-[#EDF2F6] w-full h-10 rounded-md text-[#22CB5C] p-1"
                        />
                        <br />

                        <span className="mb-5 block"></span>

                        {/* User Password Input Field */}
                        <div className="relative">
                            <label htmlFor="password">Password</label>
                            <input
                                type={isEyeOpen ? "text" : "password"}
                                id="password"
                                {...register("password", { required: true })}
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
                            <label htmlFor="confirmPassword">Password</label>
                            <input
                                type={isEyeOpen ? "text" : "password"}
                                id="confirmPassword"
                                {...register("confirmPassword", { required: true })}
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
                            <input id="image-upload" type="file" className="hidden" {...register("image")} onChange={handleImageChange} />
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
