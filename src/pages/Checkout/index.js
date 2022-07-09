// react route
import { useSearchParams } from 'react-router-dom'
// base64
import base64 from 'base-64';
// axios
import axios from 'axios';
// Cookie
import Cookies from 'js-cookie';
// hook
import { useState , useEffect } from 'react';
// v4
import { v4 } from 'uuid';

// URL
import { URL } from '../../global/url';

// css
import './index.css'

// CheckoutItem
import CheckoutItem from './components/CheckoutItem';

const Checkout = () => {
    const [ checkoutProducts , setCheckoutProducts] = useState([])
    const [ productTotalPrice , setProductTotalPrice] = useState(0)
    const [ totalPrice , setTotalPrice ] = useState(60)

    const [ searchParams ]  = useSearchParams()
    const productState = searchParams.get('state')
    const checkoutPorudctDetailIds = JSON.parse(base64.decode(productState)) 
    
    // 取要結帳的商品資料
    useEffect(() => {
        getCheckoutProduct()
    }, [] )

    const getCheckoutProduct = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/checkout/product`
        const { data } = await axios.post(url, {
            'checkoutPorudctDetailIds': checkoutPorudctDetailIds
        } , {
            headers: {
                'Authentication': accessToken
            }
        })

        if(data){
            setCheckoutProducts(data.checkoutProducts)
        }
    }
    
    // 取回商品陣列變動 更改商品總價
    useEffect(() => {
        checkoutProducts.map((item) => {
            // 把總價加上去
            setProductTotalPrice((prev) => {
                return [
                    Math.floor(prev) + Math.floor(item.quantity*item.unitPrice)
                ]
            })
        })
    }, [checkoutProducts])

    // 商品總價變動 更改全部總價
    useEffect(() => {
        setTotalPrice((prev) => {
            return [
                Math.floor(prev) + Math.floor(productTotalPrice)
            ]
        })
    }, [productTotalPrice])

    return (
        <div className="checkout">
            <div className="wrap">
                {/* columnName */}
                <div className='columnName'>
                    <p>商品圖片 - 商品名稱 - 規格</p>
                    <p>單價</p>
                    <p>數量</p>
                    <p>總計</p>
                </div>
                {/* checkoutProduct */}
                <div className='checkoutProduct'>
                    {
                        checkoutProducts.map(item => <CheckoutItem key={ v4() } productDetail={item}/>)
                    }
                </div>
                {/* checkout */}
                <div className='amount'>
                    <p>商品總金額 : ${productTotalPrice}</p>
                    <p>運費總金額 : $60</p>
                    <p>總付款金額 : ${totalPrice}</p>
                    <hr/>
                    <div className="checkoutCheck">
                        <button>下訂單</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
