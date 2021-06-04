import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitCardForm from './SplitCardForm';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51IxdvKBWOteS6VNG1Z4rlLZrOThPeTyNC6T5jNeLDzIb02BthAXJLBWjZmNUJildUOIxqhNGCm5Xrn8xHErfCsFg00NbTtS9XF');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
           <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;