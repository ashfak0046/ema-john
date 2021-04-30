import React from 'react';
import './ReviewItem.css';
const ReviewItem = (props) => {
    const { name, quantity, key, price, img } = props.product;
    console.log(props);
    const handleRemoveProduct = props.handleRemoveProduct;

    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <p>Quantity: {quantity}</p>
                <p><small>${price}</small></p>
                <br />
                <button className="main-button" onClick={() => handleRemoveProduct(key)}>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;