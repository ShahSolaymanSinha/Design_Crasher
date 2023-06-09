/* eslint-disable react/prop-types */

const Instructor = ({ image, name, email }) => {
    return (
        <div className={`card w-96 bg-base-100 shadow-xl h-full`}>
            <figure>
                <img className="w-full" src={image} alt="Shoes" />
            </figure>
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
