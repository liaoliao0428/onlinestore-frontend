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

// URL
import { URL } from '../../global/url';

// css
import './index.css'

// CheckoutItem
import CheckoutItem from './components/CheckoutItem';

const Checkout = () => {
    const [ checkoutProducts , setCheckoutProducts] = useState([])
    const [ productTotalPrice , setProductTotalPrice] = useState('')
    const [ totalPrice , setTotalPrice ] = useState('0')

    const [searchParams]  = useSearchParams()
    const productState = searchParams.get('state')
    const checkoutPorudctDetailIds = JSON.parse(base64.decode(productState)) 
    
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
            // caculateTotalPrice()
        }
    }    

    // const caculateTotalPrice = () => {
    //     checkoutProducts.map((item) => {
    //         // 把總價加上去
    //         setTotalPrice((prev) => {
    //             return [
    //                 Math.floor(prev) + Math.floor(item.quantity*item.unitPrice)
    //             ]
    //         })
    //     })
    // }

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
                        checkoutProducts.map(item => <CheckoutItem />)
                    }
                </div>
                {/* checkout */}
                <div className='amount'>
                    <p>商品總金額 : ${totalPrice}</p>
                    <p>運費總金額 : $60</p>
                    <p>總付款金額 : ${totalPrice + 60}</p>
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
