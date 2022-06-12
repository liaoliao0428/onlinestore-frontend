// 套件
import { useParams } from "react-router-dom";
// uuid套件
import { v4 } from 'uuid'
// axios套件
import axios from 'axios'
// hook
import { useState , useEffect } from 'react'

// URL
import { URL } from "../../global/url";

// css
import './index.css';

// 組件
import ProductImage from './components/ProductImage.js';
import Buyinfo from './components/Buyinfo.js';

const getProductDetail = async (productId, setProductDetail) => {
    let url = `${URL}/product/detail`
    let response = await axios.post(url,{
        productId: productId
    })
    let { productDetail } = response.data
    setProductDetail(productDetail)
}

const Product = () => {
    let { productId } = useParams()

    const [productDetail , setProductDetail] = useState([])

    useEffect(() => {
        getProductDetail(productId, setProductDetail)
    }, [productId]);

    const { product, detail, images } = productDetail

    return (
        <div className="product">
            <div className="wrap">
                <ProductImage images={images}/>
                <Buyinfo product={product} detail={detail}/>
            </div>            
        </div>
    );
}

export default Product;





