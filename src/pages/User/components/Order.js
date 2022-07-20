// Router
import { Route , Routes } from 'react-router-dom';

import { Fragment } from 'react';
// OrderManage
import OrderManage from './OrderManage';
// OrderDetail
import OrderDetail from './OrderDetail';


const Order = () => {

    return (
        <Fragment>
            <h2>我的訂單</h2>
            <Routes>
                <Route path='/' element={<OrderManage />}/>
                <Route path='/detail/:orderNumber' element={<OrderDetail />}/>
            </Routes>
        </Fragment>
    );
}

export default Order;