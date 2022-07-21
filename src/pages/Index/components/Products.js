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
// useParams
import { useParams , useSearchParams , useNavigate } from 'react-router-dom'

import Item from './Item'

const Products = (props) => {
    const history = useNavigate();
    const { categoryId } = useParams()
    const [ searchParams ]  = useSearchParams()
    const keyword = searchParams.get('keyword')
    const [products , setProducts] = useState([])

    // 選擇分類換商品
    useEffect(() => {
        getProducts()
    },[ categoryId , keyword ]);

    // 取得所有商品 有分類id取有分類 沒有取全部
    const getProducts = async () => {

        const url = `${URL}/product/all`
        const { data } = await axios.post(url,{
            'categoryId': categoryId,
            'keyword': keyword
        })

        if(data.products){
            setProducts(data.products)
        }
    }    

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