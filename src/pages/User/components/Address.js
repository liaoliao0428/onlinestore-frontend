import { v4 } from 'uuid';


import { Fragment } from 'react';
// addressItem組件
import AddressItem from './AddressItem';

const Address = () => {
    console.log('寄貨資訊');

    const  a  = [1, 2, 3]

    return (
        <Fragment>
            <h2>寄貨地址</h2>
            <div className='address'>
                {
                    a.map(item => <AddressItem key={ v4() }/>)
                }
            </div>
        </Fragment>
    );
}

export default Address;