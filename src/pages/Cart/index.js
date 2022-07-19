// axios
import axios from 'axios';
// hook
import { useState , useEffect , useRef } from 'react';
// cookies
import Cookies from 'js-cookie'
// URL
import { URL } from '../../global/url';
// v4
import { v4 } from 'uuid';
// base64
import base64 from 'base-64';
// route
import { useNavigate } from 'react-router-dom'

// css
import './index.css'

// cartProductItem
import CartProductItem from './components/CartProductItem'

const Cart = () => {
    const history = useNavigate();
    const [cartProduct , setCartProduct] = useState('')
    const [totalPrice , setTotalPrice] = useState(0)
    const [selectCartProduct , setSelectCartProduct] = useState([])
    const [selectCartProductBase64 , setSelectCartProductBase64] = useState([])

    // 進來當前頁觸發取得購物車商品
    useEffect(() => {
        getCartProduct()
    }, []);

    // 取得購物車商品
    const getCartProduct = async () => {
        const accessToken = Cookies.get('accessToken')
        let url = `${URL}/cart`
        const { data } = await axios.post(url , {} ,{
            headers: {
                'Authentication': accessToken
            }
        })

        if(data.cart){
            setCartProduct(data.cart)
        }
    }    

    // 有東西被選中後更新商品的陣列base64編碼
    useEffect(() => {
        const encodedString = base64.encode(JSON.stringify(selectCartProduct))
        setSelectCartProductBase64(encodedString)
    }, [selectCartProduct]);

    const selectCartProductCheck = () => {
        if(selectCartProduct.length == 0){
            alert('尚未選擇結帳商品')
            return null
        }else{
            history(`/checkout/?checkoutType=1&state=${selectCartProductBase64}`)
        }
    }

    // // 勾選全部商品
    // const allProductCheck = () => {
    //     // 每勾選一次狀態就改一次
    //     allProductCheckRef.current = !allProductCheckRef.current

    //     // 如果狀態是true 那就把現在這個 productDetailId 推進去 如果是false就刪除
    //     if(allProductCheckRef.current){
    //         cartProduct.map((item) => {
    //             let productDetailId = item.productDetailId
                
    //             // 把商品細項id推進去
    //             setSelectCartProduct((prev) => {
    //                 return [...prev , {
    //                     productDetailId
    //                 }]
    //             })

    //             // 把總價加上去
    //             let quantity = item.quantity
    //             let unitPrice = item.unitPrice
    //             setTotalPrice((prev) => {
    //                 return [
    //                     Math.floor(prev) + Math.floor(quantity*unitPrice)
    //                 ]
    //             })
    //         })
    //     }else{
    //         // 把不要的商品細項id全部清掉
    //         setSelectCartProduct([])

    //         // 把總價歸0
    //         setTotalPrice(0)
    //     }
    // }

    return (
        <div className="cart">
            <div className="wrap">
                {/* columnName */}
                <div className='columnName'>
                    <p>商品圖片 - 商品名稱 - 規格</p>
                    <p>單價</p>
                    <p>數量</p>
                    <p>總計</p>
                    <p>操作</p>
                </div>
                {/* cartProduct */}
                <div className='cartProduct'>
                    {
                        cartProduct ? cartProduct.map(item => <CartProductItem key={item.productDetailId} detail={item} setCartProduct={setCartProduct} setTotalPrice={setTotalPrice} setSelectCartProduct={setSelectCartProduct} />) : <p key={ v4() }>目前還沒有商品</p>
                    }
                </div>
                {/* checkoutConfirm */}
                <div className='checkoutConfirm'>
                    <div className='sellectAll'>
                        {/* <input type="checkBox" onChange={allProductCheck}/>
                        <p>全選</p> */}
                    </div>
                    <p>總金額({selectCartProduct.length}個商品) : ${totalPrice}</p>
                    <button onClick={selectCartProductCheck}>結帳</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
