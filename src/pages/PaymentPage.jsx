import { Elements } from "@stripe/react-stripe-js";
import Payment from "../components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PaymentPage = () => {
    const location = useLocation();

    if (!location.state) {
        return <Navigate to={"/"}></Navigate>;
    }

    return (
        <div>
            <Elements stripe={stripePromise}>
                <Payment state={location.state}></Payment>
            </Elements>
        </div>
    );
};

export default PaymentPage;
