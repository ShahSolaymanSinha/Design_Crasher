import axios from "axios";

const instance = axios.create({
    baseURL: "https://a12-server-side-livid.vercel.app",
    timeout: 5000,
    retry: 5, // Number of retries
    retryDelay: 1000, // Delay between retries in milliseconds
});

instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const { config, response } = error;

        // If the request can be retried and the number of retries is not exhausted
        if (config && config.retry && config.retry > 0) {
            // Calculate the delay before retrying
            const delay = config.retryDelay || 0;

            // Create a new promise that will resolve after the specified delay
            const retryPromise = new Promise((resolve) => setTimeout(resolve, delay)).then(() => {
                // Decrement the number of retries
                config.retry -= 1;

                // Retry the request
                return instance(config);
            });

            // Return the retry promise
            return retryPromise;
        }

        // If the request cannot be retried or the number of retries is exhausted, reject the error
        return Promise.reject(response || error);
    }
);

export { instance };
