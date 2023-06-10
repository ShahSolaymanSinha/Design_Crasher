/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const LazyLoadImage = ({ src, alt }) => {
    const imageRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Load the image
                        entry.target.src = src;
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: "0px",
                threshold: 0.1, // Adjust this value to determine when to start loading the image
            }
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, [src]);

    return <img className="w-full rounded-md" ref={imageRef} alt={alt} />;
};

export default LazyLoadImage;
