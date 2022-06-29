import { Fragment } from 'react';
// addressItem組件
import AddressItem from './AddressItem';

const Address = () => {

    const  a  = [1, 2, 3]

    return (
        <Fragment>
            <h2>寄貨地址</h2>
            <div className='address'>
                {
                    a.map(item => <AddressItem />)
                }
            </div>
        </Fragment>
    );
}

export default Address;