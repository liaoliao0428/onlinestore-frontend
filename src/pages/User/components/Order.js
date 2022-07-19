import { v4 } from 'uuid';
// hook
import { useState , useEffect } from 'react'
// axios套件
import axios from 'axios'
// Cookies
import Cookies from 'js-cookie';
// URL
import { URL } from '../../../global/url';
// Link
import { Link } from 'react-router-dom';


import { Fragment } from 'react';
// OrderItem組件
import OrderItem from './OrderItem';

const Order = () => {
    const [ orderStateActive , setOrderStateActive ] = useState(1)
    const [ orderData , setOrderData ] = useState([])
    const [ orderStatusChange , setOrderStatusChange ] = useState(0)

    useEffect(() => {
        getOrderData()
    }, [ orderStateActive , orderStatusChange ]);

    // 改變要撈的訂單的狀態
    const changeOrderData = async (orderState) => {
        setOrderStateActive(orderState)
    }

    // 撈訂單資料
    const getOrderData = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/order`
        const { data } = await axios.post(url , {
            'orderStateActive': orderStateActive
        } ,{
            headers: {
                'Authentication': accessToken
            }
        })

        if(data.order){
            setOrderData(data.order)
        }else{
            setOrderData()
        }
    }

    return (
        <Fragment>
            <h2>訂單管理</h2>
            <div className='orderState'>
                <button onClick={() => changeOrderData(1)} className={orderStateActive === 1 ? 'orderStateActive' : ''}>全部</button>
                <button onClick={() => changeOrderData(2)} className={orderStateActive === 2 ? 'orderStateActive' : ''}>待付款</button>
                <button onClick={() => changeOrderData(3)} className={orderStateActive === 3 ? 'orderStateActive' : ''}>待出貨</button>
                <button onClick={() => changeOrderData(4)} className={orderStateActive === 4 ? 'orderStateActive' : ''}>待收貨</button>
                <button onClick={() => changeOrderData(5)} className={orderStateActive === 5 ? 'orderStateActive' : ''}>完成</button>
                <button onClick={() => changeOrderData(6)} className={orderStateActive === 6 ? 'orderStateActive' : ''}>不成立</button>
            </div>
            <div className='orderData'>
                {
                    orderData ? orderData.map(item => <OrderItem key={ item.id } orderData={item} setOrderStatusChange={setOrderStatusChange}/>) : <p key={ v4() } className='noOrder'>無訂單</p>
                }
            </div>
        </Fragment>
    );
}

export default Order;