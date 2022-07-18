import { v4 } from 'uuid';
// axios
import axios from 'axios';
// URL
import { URL } from '../../../global/url'
// Cookie
import Cookies from 'js-cookie';
// hook
import { useState , useEffect } from 'react';


import { Fragment } from 'react';
// addressItem組件
import AddressItem from './AddressItem';

const Address = () => {

    const [ userReceiveAddress , setUserReceiveAddress ] = useState([])
    const [ defaultReceiveAddress , setDefaultReceiveAddress ] = useState(0)

    useEffect(() => {
        getUserReceiveAddress()
    }, []);

    useEffect(() => {
        getUserReceiveAddress()
    }, [defaultReceiveAddress]);

    // 撈使用者收件地址資料
    const getUserReceiveAddress = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/userReceiveAddress`
        const { data } = await axios.post(url,{

        },{
            headers: {
                'Authentication': accessToken
            }
        })

        if(data){
            setUserReceiveAddress(data.userReceiveAddress)
        }
    }

    // 新增綠界地址
    const addReceiveAddress = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/userReceiveAddress/ecpayLogisticsSelection`
        const { data } = await axios.post(url , {
            
        } , {
            headers: {
                'Authentication': accessToken
            }
        })

        // 綠界sdk會回傳html回來 將不要的元素去掉 重組一個 並觸發submit
        if(data){
            // 去掉不要的元素
            let ret = data.replace('<script type="text/javascript">var vPostForm = document.PostForm;vPostForm.submit();</scr', '')
            ret = ret.replace('ipt></body></html>', '')
            ret = ret.replace('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>', '')

            // 把取出的html塞入<div id='addressForm'>內 並觸發送出
            const orderForm = document.getElementById('addressForm')
            orderForm.innerHTML = ret
            document.getElementById('PostForm').submit()
        }        
    }

    return (
        <Fragment>
            <div className='addReceiveAddress'>
                <h2>寄貨地址</h2>
                <button onClick={addReceiveAddress}>新增地址</button>
            </div>
            <div className='address'>
                {
                    userReceiveAddress ? userReceiveAddress.map(item => <AddressItem key={ item.receiveAddressId } userReceiveAddress={ item } setUserReceiveAddress={ setUserReceiveAddress } setDefaultReceiveAddress={ setDefaultReceiveAddress }/>) : <p key={ v4() }>目前無設定地址</p>
                }
            </div>
            <div id="addressForm" hidden> </div>
        </Fragment>
    );
}

export default Address;