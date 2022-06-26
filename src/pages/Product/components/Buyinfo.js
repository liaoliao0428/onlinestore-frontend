// hook
import { useState , useEffect , useRef , useCallback } from 'react'
// uuid套件
import { v4 } from 'uuid'

import { useLocation } from 'react-router-dom';

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
    const changeQuantity = (e) => {
        setQuantity(e.target.value)
        if(e.target.value < buyQuantity){
            setBuyQuantity(e.target.value)
        }
    }

    const [ buyQuantity , setBuyQuantity] = useState(1)
    const changeBuyQuantity = (e) => {
        Math.floor(e.target.value) < Math.floor(quantity) ? setBuyQuantity(e.target.value) : setBuyQuantity(quantity)       
    }

    return (
        // buyinfo
        <div className="buyinfo">
            <h1>{productName}</h1>
            <h2>NT {price}</h2>
            <select onChange={(e) => changeQuantity(e)}>
                <option value={0} >選擇商品規格</option>
                {
                    detail.map(item => <option key={ item.id } value={item.quantity} >{item.productDetailName} - {item.specification}</option>)
                }
            </select>
            <h3>數量</h3>
            <input type="number" value={buyQuantity} onChange={(e) => changeBuyQuantity(e)}/>
            <h3>剩餘{quantity}件</h3>
            <button className="buynow">直接購買</button>
            <button className="cart"><i className="fa-solid fa-cart-shopping"></i> 放入購物車</button>
            <p>付款後，從備貨到寄出商品為 3 個工作天。（不包含假日）</p>
            <p>商成統一使用綠界發票</p>
        </div>
    );
}

export default Buyinfo;
