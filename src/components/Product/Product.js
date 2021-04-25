import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';



const Product = (props) => {
    const { name, price, seller , img ,stock,shipping } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br/>
                <p>by:{seller}</p>
                <p>Price:${price}</p>
                <p>Shipping Charge:${shipping}</p>
                <br/>
                <p><small>Only {stock} left in stock-Order soon</small></p>
                <button className="main-button"
                onClick={() => props.handleAddProduct(props.product)}
                >
                    <FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
            </div>


        </div>
    );
};

export default Product;