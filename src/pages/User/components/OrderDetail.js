// Router
import { Link , useParams , useNavigate } from "react-router-dom";
// hook
import { useState , useEffect } from "react";
// Cookies
import Cookies from "js-cookie";
// URL
import { URL } from "../../../global/url";
// base64
import base64 from 'base-64';
// axios
import axios from "axios";

// OrderDetailItem組件
import OrderDetailItem from "./OrderDetailItem";

const OrderDetail = () => {
    let data = useParams()
    const history = useNavigate();
    const { orderNumber } = data
    const [ createTime , setCreateTime ] = useState('')
    const [ receiverName , setReceiverName ] = useState('')
    const [ receiverCellPhone , setReceiverCellPhone ] = useState('')
    const [ receiverAddress , setReceiverAddress ] = useState('')
    const [ receiverStoreType , setReceiverStoreType ] = useState('')
    const [ deliveryFee , setDeliveryFee ] = useState('')
    const [ amount , setAmount ] = useState('')
    const [ payMethod , setPayMethod ] = useState('')
    const [ payStatus , setPayStatus ] = useState('')
    const [ payStatusName , setPayStatusName ] = useState('')
    const [ payTime , setPayTime ] = useState('')
    const [ invoiceNumber , setInvoiceNumber ] = useState('')
    const [ carrierId , setCarrierId ] = useState('')
    const [ invoiceDonateName , setInvoiceDonateName ] = useState('')
    const [ orderStatus , setOrderStatus ] = useState('')
    const [ orderStatusName , setOrderStatusName ] = useState('')
    const [ orderStatusChange , setOrderStatusChange ] = useState(0)
    const [ orderDetailDatas , setOrderDetailDatas ] = useState([])

    useEffect(() => {
        getOrderFullData()
    } , [orderStatusChange])

    const getOrderFullData = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/order/orderFullData`
        const { data } = await axios.post(url,{
            'orderNumber': orderNumber
        },{
            headers: {
                'Authentication': accessToken
            }
        })

        console.log(data.orderFullData.orderDetail);

        if ( data.orderFullData ) {
            const { createTime , receiverName , receiverCellPhone , receiverStoreTypeName , receiverStoreName , deliveryFee , amount , payMethod , payStatus , payStatusName , payTime , invoiceNumber , carrierId , orderStatus , orderStatusName , invoiceDonateName} = data.orderFullData.order
            setCreateTime(createTime)
            setReceiverName(receiverName)
            setReceiverCellPhone(receiverCellPhone)
            setReceiverAddress(receiverStoreTypeName + receiverStoreName)
            setReceiverStoreType(receiverStoreTypeName)
            setDeliveryFee(deliveryFee)
            setAmount(amount)
            setPayMethod(payMethod)
            setPayStatus(payStatus)
            setPayStatusName(payStatusName)
            setPayTime(payTime)
            setInvoiceNumber(invoiceNumber)
            setCarrierId(carrierId)
            setInvoiceDonateName(invoiceDonateName)
            setOrderStatus(orderStatus)
            setOrderStatusName(orderStatusName)
            setOrderDetailDatas(data.orderFullData.orderDetail)
        }
    }

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
        <div className="orderDetail">
            <Link to='/user/order'>{' <- '}回上頁</Link>
            <div className="orderDetailData">
                <div className="orderDetailData1">
                    <p>訂單編號 : { orderNumber }</p>
                    <p>訂單日期 : { createTime }</p>
                    <p>收件人 : { receiverName }</p>
                    <p>收件電話 : { receiverCellPhone }</p>
                    <p>收件地址 : { receiverAddress }</p>
                    <p>寄件物流 : { receiverStoreType }</p>
                    <p>寄送運費 : ${ deliveryFee }</p>
                    <div className="orderAction">
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
                </div>
                <div className="orderDetailData2">
                    <p>訂單金額 : ${ amount }</p>
                    <p>付款方式 : { payMethod }</p>
                    <p>付款狀態 : { payStatusName }</p>
                    <p>付款時間 : { payTime }</p>
                    <p>發票號碼 : { invoiceNumber }</p>
                    <p>發票統編 : </p>
                    <p>發票載具 : { carrierId }</p>
                    <p>發票捐贈 : { invoiceDonateName }</p>
                    <p>訂單狀態 : { orderStatusName }</p>
                </div>
            </div>
            <div className="orderDetailItems">
                <div className="orderDetailItem detailColumn">
                    <p>商品分類</p>
                    <p>商品名稱</p>
                    <p>規格</p>
                    <p>單價</p>
                    <p>數量</p>
                    <p>總金額</p>
                </div>
                {
                    orderDetailDatas.map(item => <OrderDetailItem key={ item.id } orderDetail={item}/>)
                }
            </div>
        </div>
    );
}

export default OrderDetail;
