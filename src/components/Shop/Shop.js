import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px',
        marginTop: '5px',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search,setSearch] = useState('');
    const classes = useStyles();

    useEffect(() => {
        fetch('https://immense-basin-30930.herokuapp.com/products?search='+search)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [search])
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        console.log(products, productKeys)
        if (products.length > 0) {
            const previousCart = productKeys.map(existingKey => {
                const product = products.find(pd => pd.key === existingKey);
                product.quantity = savedCart[existingKey];
                return product;
            })
            setCart(previousCart);
        }
    }, [products])

    const handleAddProducts = (product) => {
        const productToBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === product.key)
        let newCart;
        let count = 1;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd !== productToBeAdded);
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)

    }

    const handleSearch = event => { 
        setSearch(event.target.value);
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                <input type="text" onBlur={handleSearch} className="product-search" />
                {
                    products.length === 0 && <div className={classes.root}>
                        <CircularProgress />
                    </div>
                }
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProducts}
                        product={pd}>

                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;