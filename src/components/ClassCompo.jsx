/* eslint-disable react/prop-types */

import LazyLoadImage from "./LazyLoadImage";

const ClassCompo = ({ image, name, instructor, availableSeats, price }) => {
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl mx-auto h-full">
                <LazyLoadImage src={image} alt={name}></LazyLoadImage>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <div>
                        <p>Instructor: {instructor}</p>
                        <p>Available Seats: {availableSeats}</p>
                    </div>
                    <p className="text-green-400">Price: {price}</p>
                    <div className="card-actions">
                        <button className="btn btn-primary w-full bg-[#00AC61] border-none outline-none">Select</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCompo;
