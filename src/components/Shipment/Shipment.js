import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css'

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [shippingData,setShippingData] = useState(null);

    const onSubmit = data => {
        setShippingData(data)

    };

    const processOrder = paymentID => {
        const savedCart = getDatabaseCart();
        const orderDetails = {
            ...loggedInUser,
            products: savedCart,
            shipment: shippingData,
            paymentID,
            orderTime: new Date()

        };
        fetch('https://immense-basin-30930.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('Your order placed successfully')
                }
            })
    }

    return (
        <div className="row">
            <div style={{display: shippingData ? 'none' : 'block'}} className="col-md-6">
                <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                    <input name="name" defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Enter Your Name" />
                    {errors.exampleRequired && <span className="error">Name is required</span>}

                    <input name="email" defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Enter Your Email" />
                    {errors.exampleRequired && <span className="error">Email is required</span>}

                    <input name="address" {...register("address", { required: true })} placeholder="Enter Your Address" />
                    {errors.exampleRequired && <span className="error">Address is required</span>}

                    <input name="phone" {...register("phone", { required: true })} placeholder="Enter Your Phone Number" />
                    {errors.exampleRequired && <span className="error">Phone Number is required</span>}

                    <input type="submit" />

                </form>
            </div>
            <div style={{display: shippingData ? 'block' : 'none'}}  className="col-md-6">
                <h3>Please Pay</h3>
                <ProcessPayment handlePayment={processOrder} />
            </div>
        </div>
    );
};

export default Shipment; <h1>This is shipment</h1>