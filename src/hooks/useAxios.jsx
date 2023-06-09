import axios from "axios";

const useAxios = () => {
    const instance = axios.create({
        baseURL: "https://a12-server-side-mdsinha.vercel.app",
        timeout: 100000,
    });
    return instance;
};

export default useAxios;
