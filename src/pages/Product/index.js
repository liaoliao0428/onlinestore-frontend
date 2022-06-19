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

const Product = () => {
    let { productId } = useParams()

    const [product , setProduct] = useState([])
    const [detail , setDetail] = useState([])
    const [images , setImages] = useState([])

    // 撈商品細項資料
    const getProductDetail = async (productId) => {
        let url = `${URL}/product/detail`
        let response = await axios.post(url,{
            productId: productId
        })

        const { product, detail, images } = response.data.productDetail

        setProduct(product)
        setDetail(detail)
        setImages(images)
    }

    useEffect(() => {
        getProductDetail(productId)
    }, []);

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





