import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    // const Total = cart.reduce((total,prd) => total + prd.price,0)
    let total = 0;
    let shippingCharge = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total =(total + product.price);
        shippingCharge = (shippingCharge + product.shipping);
        
    }
    const tax = total / 5;
    const grandTotal =(total + Number(tax) + shippingCharge).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div className="cart">
            <h4 className="text-danger">Order Summary</h4>
            <p>Item Ordered:{cart.length}</p>
            <p>Product Price: ${formatNumber(total)}</p>
            <p> <small>Shipping Cost: ${formatNumber(shippingCharge)}</small> </p>
            <p> <small>Tax + VAT: ${formatNumber(tax)}</small> </p>
            <p>Total Price: ${grandTotal}</p>
        </div>
    );
};

export default Cart;