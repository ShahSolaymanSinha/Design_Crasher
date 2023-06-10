/* eslint-disable react/prop-types */

import LazyLoadImage from "./LazyLoadImage";

const Instructor = ({ image, name, email }) => {
    return (
        <div className={`card w-96 bg-base-100 shadow-xl h-full mx-auto`}>
            <LazyLoadImage src={image} alt={name}></LazyLoadImage>
            <div className="card-body">
                <div>
                    <h2 className="card-title">{name}</h2>
                    <p>{email}</p>
                </div>
                <div className="card-actions">
                    <button className={`btn btn-primary w-full outline-none border-none bg-[#00AC61] text-black hover:text-white`}>See Classes</button>
                </div>
            </div>
        </div>
    );
};

export default Instructor;
