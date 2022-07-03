// hook
import { useState , useEffect , useRef , useCallback } from 'react'
// uuid套件
import { v4 } from 'uuid'
// cookies
import Cookies from 'js-cookie'
// axios
import axios from 'axios'
// Url
import { URL } from '../../../global/url'

const Buyinfo = ( props ) => {

    const { product , detail } = props
    let productName = product.productName
    let length = detail.length
    let miniPrice = ''
    let maxPrice = ''
    let price = ''

    miniPrice = detail[0] ? Math.floor(detail[0].unitPrice) : null
    maxPrice = detail[length-1] ? Math.floor(detail[length-1].unitPrice) : null
    price = miniPrice != maxPrice ? `$${miniPrice} - $${maxPrice}` : `$${miniPrice}`

    const [ quantity , setQuantity ] = useState(0)
    const [ buyQuantity , setBuyQuantity] = useState(1)
    const [ selectProductDetailId , setSelectProductDetailId] = useState('')

    const changeQuantity = (e) => {

        setSelectProductDetailId(e.target.value)

        let selectProduct = detail.find(function(item, index, array){
                                return item.productDetailId === e.target.value
                            });

        setQuantity(selectProduct.quantity)
        if(e.target.value < buyQuantity){
            setBuyQuantity(e.target.value)
        }
    }

    const changeBuyQuantity = (e) => {
        Math.floor(e.target.value) < Math.floor(quantity) ? setBuyQuantity(e.target.value) : setBuyQuantity(quantity)       
    }

    // 商品加入購物車
    const productAddToCart = async () => {
        let accessToken = Cookies.get('accessToken')
        let url = `${URL}/cart/insert`

        if (!selectProductDetailId) {
            alert('請選擇正確商品')
            return false
        }

        const { data } = await axios.post(url,{
            'accessToken': accessToken,
            'productDetailId': selectProductDetailId,
            'quantity': buyQuantity
        })

        if (data) {
            alert('商品已加入購物車')
            return false
        }else{
            alert('錯誤')
            return false
        }
    }

    return (
        // buyinfo
        <div className="buyinfo">
            <h1>{productName}</h1>
            <h2>NT {price}</h2>
            <select onChange={(e) => changeQuantity(e)}>
                <option value={0}>選擇商品規格</option>
                {
                    detail.map(item => <option key={ item.id } value={item.productDetailId} >{item.productDetailName} - {item.specification}</option>)
                }
            </select>
            <h3>數量</h3>
            <input type="number" value={buyQuantity} onChange={(e) => changeBuyQuantity(e)}/>
            <h3>剩餘{quantity}件</h3>
            <button className="buynow">直接購買</button>
            <button className="cart" onClick={productAddToCart}><i className="fa-solid fa-cart-shopping"></i> 放入購物車</button>
            <p>付款後，從備貨到寄出商品為 3 個工作天。（不包含假日）</p>
            <p>商成統一使用綠界發票</p>
        </div>
    );
}

export default Buyinfo;
