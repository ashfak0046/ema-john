import React, { useEffect, useState } from 'react';
// import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyimg from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const[orderPlaced,setOrderPlaced] = useState(false)
    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys)
        fetch('https://immense-basin-30930.herokuapp.com/productsByKeys',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])
    // /////
    const handleRemoveProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    const history  = useHistory();
    const handleProceedCheckout = () => {
        history.push('/shipment')
    }
   let thankYou;
   if(orderPlaced){
        thankYou =  <img src={happyimg} alt=""/>
   }
   /////// ///////////// ///////////// //////////
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        handleRemoveProduct={handleRemoveProduct}
                        product={pd}
                        key={pd.key}
                    ></ReviewItem>)
                }
                { thankYou }
            </div>
            <div className="cart-container">
                    <Cart cart={cart}>
                        <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                    </Cart>
            </div>
        </div>
    );
};

export default Review;