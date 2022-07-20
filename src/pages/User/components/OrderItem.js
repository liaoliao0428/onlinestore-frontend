// axios
import axios from "axios";
// Cookies
import Cookies from "js-cookie";
// URL
import { URL } from "../../../global/url";
// route
import { useNavigate } from 'react-router-dom'
// base64
import base64 from 'base-64';
// Line
import { Link } from "react-router-dom";

const OrderItem = ( props ) => {
    const history = useNavigate();
    const { orderNumber , orderStatus , orderStatusName , amount , payStatus , payStatusName , payTime } = props.orderData
    const { setOrderStatusChange } = props

    // 訂單結帳 取得結帳商品 跳轉到結帳頁面
    const checkoutOrder = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/order/getOrderDetailIdNotPay`
        const { data } = await axios.post(url,{
            'orderNumber': orderNumber
        },{
            headers: {
                'Authentication': accessToken
            }
        })

        const encodedString = base64.encode(JSON.stringify(data.productDetailId))

        history(`/checkout/?checkoutType=${orderNumber}&state=${encodedString}`)
    }

    // 完成訂單
    const finishOrder = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/order/finishOrder`
        const { data } = await axios.patch(url,{
            'orderNumber': orderNumber
        },{
            headers: {
                'Authentication': accessToken
            }
        })

        if (data) {
            setOrderStatusChange((prev) => {
                return prev+1
            })
        }
    }

    // 取消訂單申請
    const cancelOrderApply = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/order/cancelOrderApply`
        const { data } = await axios.patch(url,{
            'orderNumber': orderNumber
        },{
            headers: {
                'Authentication': accessToken
            }
        })

        if (data) {
            setOrderStatusChange((prev) => {
                return prev+1
            })
        }
    }

    // 申請退貨申請
    const returnOrderApply = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/order/returnOrderApply`
        const { data } = await axios.patch(url,{
            'orderNumber': orderNumber
        },{
            headers: {
                'Authentication': accessToken
            }
        })

        if (data) {
            setOrderStatusChange((prev) => {
                return prev+1
            })
        }
    }
    
    return (
        <div className="orderItem">
            <Link to={`/user/order/detail/${orderNumber}`}>
                <p>訂單編號 : {orderNumber}</p>
                <p>訂單狀態 : {orderStatusName}</p>
                <p>訂單金額 : ${amount}</p>
                <p>付款狀態 : {payStatusName}</p>
                <p>付款時間 : {payTime}</p>
            </Link>
            {
                payStatus == 0 && orderStatus == 1 ? <button className="checkoutOrder orderActionButton" onClick={checkoutOrder}>訂單結帳</button> : null
            }
            {
                orderStatus == 1 || orderStatus == 2 ? <button className="cancelOrder orderActionButton" onClick={cancelOrderApply}>取消訂單</button> : null
            }
            {
                orderStatus == 4 ? <button className="finishOrder orderActionButton" onClick={finishOrder}>完成訂單</button> : null
            } 
            {
                orderStatus == 4 || orderStatus == 5 ? <button className="returnOrder orderActionButton" onClick={returnOrderApply}>申請退貨</button> : null
            }                     
        </div>
    );
}

export default OrderItem;
