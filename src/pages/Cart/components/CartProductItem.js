// Cookies
import Cookies from 'js-cookie';
// axios
import axios from 'axios';
// URL
import { URL } from '../../../global/url';
// hook
import { useRef } from 'react';

const CartProductItem = (props) => {

    const { detail , setCartProduct , setSelectCartProduct , setTotalPrice } = props
    const { image , productDetailId , productName , quantity , specification , unitPrice } = detail
    const productCheckRef = useRef(false)

    // 刪除購物車商品
    const deleteCartProduct = async () => {
        const accessToken = Cookies.get('accessToken')
        let url = `${URL}/cart/delete`

        const { data } = await axios.delete(url , {
            headers: {
                'Authentication': accessToken
            },
            data: {
                'productDetailId': productDetailId
            }
        })

        // 把購物車陣列裡的商品刪除 讓畫面可以重新render
        if( data ){
            setCartProduct((prev) => {
                return prev.filter(item => item.productDetailId !== productDetailId)
            })

            // 把不要的商品細項id拉出
            setSelectCartProduct((prev) => {
                return prev.filter(item => item.productDetailId !== productDetailId)
            })

            // 把總價扣掉
            setTotalPrice((prev) => {
                return [
                    Math.floor(prev) - Math.floor(quantity*unitPrice)
                ]
            })
        }        
    }

    // 勾選要買的商品
    const productCheck = () => {

        // 每勾選一次狀態就改一次
        productCheckRef.current = !productCheckRef.current

        // 如果狀態是true 那就把現在這個 productDetailId 推進去 如果是false就刪除
        if(productCheckRef.current){
            // 把商品細項id推進去
            setSelectCartProduct((prev) => {
                return [...prev , {
                    productDetailId
                }]
            })

            // 把總價加上去
            setTotalPrice((prev) => {
                return [
                    Math.floor(prev) + Math.floor(quantity*unitPrice)
                ]
            })
        }else{
            // 把不要的商品細項id拉出
            setSelectCartProduct((prev) => {
                return prev.filter(item => item.productDetailId !== productDetailId)
            })

            // 把總價扣掉
            setTotalPrice((prev) => {
                return [
                    Math.floor(prev) - Math.floor(quantity*unitPrice)
                ]
            })
        }
    }

    return (
        <div className='cartProductItem'>
            <div className='cartProductBasic'>
                <input type="checkBox" onChange={productCheck} />
                <img src={image} alt="商品縮圖" />
                <p>{productName}</p>
                <p>{specification}</p>
            </div>            
            <p>${unitPrice}</p>
            <p className='quantity'>{quantity}</p>
            <p>${unitPrice * quantity}</p>
            <button onClick={deleteCartProduct}>刪除</button>
        </div>
    );
}

export default CartProductItem;
