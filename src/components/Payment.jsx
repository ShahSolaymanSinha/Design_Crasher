/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { instance } from "../utils/axiosInstance";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Payment = ({ state }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const navigate = useNavigate();

    console.log(state);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        instance
            .post("/create-payment-intent", { classID: state.selectedClass._id, price: state.selectedClass.courseInfo.price })
            .then((res) => {
                console.log(res.data.clientSecret);

                setClientSecret(res.data.clientSecret);
            })
            .catch((err) => console.log(err));
    }, [state, stripe]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("error", error);
            setCardError(error.message);
        } else {
            setCardError("");
            // console.log('payment method', paymentMethod)
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "unknown",
                    name: user?.displayName || "anonymous",
                },
            },
        });

        if (confirmError) {
            console.log(confirmError);
        }

        console.log("payment intent", paymentIntent);

        setProcessing(false);

        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price: state.selectedClass.courseInfo.price,
                date: new Date(),
                className: state.selectedClass.courseInfo.name,
                coverImage: state.selectedClass.courseInfo.coverImage,
                status: "Paid",
            };
            instance.post("/saveTransaction", payment).then((res) => {
                console.log(res.data);
                if (res.data) {
                    // display confirm
                    console.log("Transaction saved to DB");
                    navigate("/dashboard/student/enrolledClasses");

                    // Retrieve the array from local storage
                    const existingData = localStorage.getItem("SelectedClasses");
                    let selectedClasses = [];

                    if (existingData) {
                        selectedClasses = JSON.parse(existingData);
                    }

                    // Delete a specific string from the array
                    selectedClasses = selectedClasses.filter((item) => item !== state.selectedClass._id);

                    // Convert the modified array back to a string
                    const updatedData = JSON.stringify(selectedClasses);

                    // Store the updated string in local storage
                    localStorage.setItem("SelectedClasses", updatedData);
                }
            });
        }
    };

    return (
        <form className="w-full md:w-3/4 lg:w-1/2 mx-auto px-5 mt-20" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <div className="w-full flex justify-center mt-5">
                <button className="bg-[#00AC61] px-5 py-2 hover:bg-[#EFF54D] rounded-lg" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
                {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
                {transactionId && <p className="text-green-500">Transaction complete with transactionId: {transactionId}</p>}
            </div>
        </form>
    );
};

export default Payment;
