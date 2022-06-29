import { Fragment } from 'react';
// addressItem組件
import OrderItem from './OrderItem';

const Order = () => {

    const  a  = [1, 2, 3]

    return (
        <Fragment>
            <h2>訂單管理</h2>
            <div className='order'>
                {
                    a.map(item => <OrderItem />)
                }
            </div>
        </Fragment>
    );
}

export default Order;