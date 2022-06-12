// 路由套件
import { Link } from 'react-router-dom'
// uuid套件
import { v4 } from 'uuid'
// axios套件
import axios from 'axios'
// hook
import { useState , useEffect } from 'react'

// URL
import { URL } from '../../../global/url'

import Item from './Item'


// 取得所有商品 有分類id取有分類 沒有取全部
const getProducts = async (categoryId, setProducts) => {
    let url = `${URL}/product/all`
    let response = await axios.post(url,{
        categoryId: categoryId
    })
    let { products } = response.data
    setProducts(products)
}

const Products = (props) => {
    let { categoryId } = props

    // 使用hook
    const [products , setProducts] = useState([])

    useEffect(() => {
        getProducts(categoryId, setProducts)
    },[categoryId]);

    return (
        <div className="products">
            <div className="wrap">
                {
                    products.map(item => <Item key={ v4() } id={ v4() } product={item}/>)
                }
            </div>
        </div>
    )
}

export default Products