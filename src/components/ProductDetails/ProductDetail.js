import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const ProductDetail = () => {
    const { productKey } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([])
    document.title = 'product details';

    useEffect(() => {
        fetch(`https://immense-basin-30930.herokuapp.com/product/${productKey}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        setLoading(false)
    },[productKey])
    
    const classes = useStyles();

    // const product = fakeData.find(pd => pd.key === productKey);

    // useEffect(() => {
    //     fetch(product)
    //     .then(res => res.json())
    //     .then(data => {
    //         setProducts(data)
    //         setLoading(false)
    //     })
    // },[product])


    // useEffect(() => {
    //     fetch('/product/' + productKey)
    //         .then(res => res.json())
    //         .then(data => {
    //             setProduct(data)
    //             setLoading(false)
    //         })
    // }, [productKey])
    // console.log(product);

    return (
        <div>
            <h1>Product details</h1>
             {loading ? <div className={classes.root}>
                 <CircularProgress/>
            </div> :  <Product showAddToCart={false} product={product}></Product> } 

           
        </div>
    );
};

export default ProductDetail;