import { v4 } from 'uuid';
// hook
import { useState , useEffect } from 'react'

import { Fragment } from 'react';
// addressItem組件
import OrderItem from './OrderItem';

const Order = () => {
    console.log('訂單');
    const [orderStateActive , setOrderStateActive] = useState('1')

    const  a  = [1, 2, 3]

    const changeOrderData = async (orderState) => {
        setOrderStateActive(orderState)
        console.log(orderState);
    }

    return (
        <Fragment>
            <h2>訂單管理</h2>
            <div className='orderState'>
                <button onClick={() => changeOrderData(1)} className={orderStateActive == 1 ? 'orderStateActive' : ''}>全部</button>
                <button onClick={() => changeOrderData(2)} className={orderStateActive == 2 ? 'orderStateActive' : ''}>待付款</button>
                <button onClick={() => changeOrderData(3)} className={orderStateActive == 3 ? 'orderStateActive' : ''}>待出貨</button>
                <button onClick={() => changeOrderData(4)} className={orderStateActive == 4 ? 'orderStateActive' : ''}>待收貨</button>
                <button onClick={() => changeOrderData(5)} className={orderStateActive == 5 ? 'orderStateActive' : ''}>完成</button>
                <button onClick={() => changeOrderData(6)} className={orderStateActive == 6 ? 'orderStateActive' : ''}>不成立</button>
            </div>
            <div className='orderData'>
                {
                    a.map(item => <OrderItem key={ v4() }/>)
                }
            </div>
        </Fragment>
    );
}

export default Order;