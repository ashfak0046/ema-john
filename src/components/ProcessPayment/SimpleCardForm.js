import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const SimpleCardForm = ({handlePayment}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentError, setPaymentError] = useState('');
    const [paymentSuccess,setPaymentSuccess] = useState('');        


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (error) {
            setPaymentError(error.message);
            setPaymentSuccess('');
        } else {
            setPaymentSuccess(paymentMethod.id)
            setPaymentError('');
            handlePayment(paymentMethod.id)
            console.log('[PaymentMethod]', paymentMethod);
        }

    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            {paymentError && <p style={{color:'red'}}>{paymentError}</p>}
            {paymentSuccess && <p style={{color:'green'}}>Your Payment was successful</p>}
        </div>
    );
};

export default SimpleCardForm;