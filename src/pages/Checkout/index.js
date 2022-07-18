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
// changeAddressModal
import ChangeAddressModal from "./components/ChangeAddressModal";

const Checkout = () => {
    const [ checkoutProducts , setCheckoutProducts ] = useState([])
    const [ productTotalPrice , setProductTotalPrice ] = useState(0)
    const [ totalPrice , setTotalPrice ] = useState(60)
    const [ payMedhod , setPayMedhod ] = useState(1)
    const [ ecpayChecked , setEcpayChecked ] = useState(true)
    const [ lineayChecked , setLinepayChecked ] = useState(false)
    const [ receiveAddressId , setReceiveAddressId ] = useState('')
    const [ receiverName , setReceiverName ] = useState('')
    const [ receiverCellPhone , setReceiverCellPhone ] = useState('')
    const [ receiverStoreType , setReceiverStoreType ] = useState('')
    const [ receiverStoreName , setReceiverStoreName ] = useState('')
    const [ receiverAddress , setReceiverAddress ] = useState('')
    const [ changeAddressModalOpen , setChangeAddressModalOpen ] = useState(false);
    const [ selectedAddressId , setSelectedAddressId ] = useState('');

    // 取網址傳的search參數
    const [ searchParams ]  = useSearchParams()
    const productState = searchParams.get('state')
    const checkoutPorudctDetailIds = JSON.parse(base64.decode(productState)) 
    
    // 取要結帳的商品資料
    useEffect(() => {
        getCheckoutProduct()
        getReceiverDefaultAddress()
    }, [])

    // 如果改變寄送資訊重新撈一次寄送資訊的部分
    useEffect(() => {
        getReceiverDefaultAddress()
    }, [ selectedAddressId ]);

    // 取回商品陣列變動 更改商品總價
    useEffect(() => {
        checkoutProducts.forEach((item) => {
            // 把總價加上去
            setProductTotalPrice((prev) => {
                return Math.floor(prev) + Math.floor(item.quantity*item.unitPrice)
                
            })
        })
    }, [checkoutProducts])

    // 商品總價變動 更改全部總價
    useEffect(() => {
        setTotalPrice((prev) => {
            return Math.floor(prev) + Math.floor(productTotalPrice)
            
        })
    }, [productTotalPrice])

    // 取要結帳的商品資料
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
    
    // 取得寄送資訊
    const getReceiverDefaultAddress = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/checkout/getReceiverDefaultAddress`
        const { data } = await axios.post(url, {

        } , {
            headers: {
                'Authentication': accessToken
            }
        })

        if ( data.receiverDefaultAddress ) {
            const { receiveAddressId , receiverName , receiverCellPhone , receiverStoreType , receiverStoreName , receiverAddress } = data.receiverDefaultAddress
            setReceiveAddressId(receiveAddressId)
            setReceiverName(receiverName)
            setReceiverCellPhone(receiverCellPhone)
            setReceiverStoreType(receiverStoreType)
            setReceiverStoreName(receiverStoreName)
            setReceiverAddress(receiverAddress)
        }
    }

    // 改變付款方式
    const changePayMethod = (e) => {
        let checkedPayMethod = Number(e.target.value)
        if (payMedhod !== checkedPayMethod) {
            setPayMedhod(checkedPayMethod)
            setEcpayChecked(!ecpayChecked)
            setLinepayChecked(!lineayChecked)
        }
    }

    // 結帳
    const checkout = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/checkout`
        const { data } = await axios.post(url , {
            'checkoutProducts': checkoutProducts,
            'productTotalPrice': productTotalPrice,
            'totalPrice': totalPrice,
            'payMedhod': payMedhod,
            'receiveAddressId': receiveAddressId,
            'checkoutType': 1    // checkoutType == 1 代表要先建立訂單才能結帳
        } , {
            headers: {
                'Authentication': accessToken
            }
        })

        if(data.payType){
            switch (data.payType) { // 1->綠界、2->linepay
                case 1:
                    // 綠界sdk會回傳html回來 將不要的元素去掉 重組一個 並觸發submit
                    // 去掉不要的元素
                    let ecpayPaymentHtml = data.ecpayPaymentHtml
                    let ret = ecpayPaymentHtml.replace('<script type="text/javascript">document.getElementById("ecpay-form").submit();</scr', '')
                    ret = ret.replace('ipt></body></html>', '')
                    ret = ret.replace('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>', '')

                    // 把取出的html塞入<div id='orderForm'>內 並觸發送出
                    const orderForm = document.getElementById('orderForm')
                    orderForm.innerHTML = ret
                    document.getElementById('ecpay-form').submit()
                break;
    
                case 2:
                    // linepay會回傳付款網址 直接轉址
                    window.location.href = data.redirecturl
                break;
            }
        }       
    }

    return (
        <div className="checkout">
            {changeAddressModalOpen && <ChangeAddressModal setChangeAddressModalOpen={setChangeAddressModalOpen} setSelectedAddressId={setSelectedAddressId}/>}
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
                {/* userReceiveAddress */}
                <div className='userReceiveAddress'>
                    <div className='receiveInfo'>
                        <p>寄送資訊</p>
                        <button className='changeReceiveAddress' onClick={() => {setChangeAddressModalOpen(true)}}>變更</button>
                    </div>                    
                    <hr/>
                    <div className='receiveAddress'>
                        <p>全名 : {receiverName}</p>
                        <p>手機 : {receiverCellPhone}</p>
                        <p>超商 : {receiverStoreType} {receiverStoreName}</p>
                        <p>地址 : {receiverAddress}xx路xx段xx號</p>
                    </div>
                </div>
                {/* amount */}
                <div className='amount'>
                    <div className='payMedhod'>
                        <p>付款方式 : </p>
                        <input type="checkbox" value={1} onChange={(e) => changePayMethod(e)} checked={ecpayChecked}/><p>綠界</p>
                        <input type="checkbox" value={2} onChange={(e) => changePayMethod(e)} checked={lineayChecked}/><p>linepay</p>
                    </div>
                    <hr/>
                    <p>商品總金額 : ${productTotalPrice}</p>
                    <p>運費總金額 : $60</p>
                    <p>總付款金額 : ${totalPrice}</p>
                    <hr/>
                    <div className="checkoutCheck">
                        <button onClick={checkout}>下訂單</button>
                    </div>
                    <div id="orderForm"> </div>
                </div>
            </div>            
        </div>
    );
}

export default Checkout;
