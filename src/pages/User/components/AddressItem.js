// axios
import axios from "axios";
// Cookie
import Cookies from "js-cookie";
// URL
import { URL } from "../../../global/url";

const AddressItem = ( props ) => {

    const { receiveAddressId , receiverName , receiverCellPhone , receiverStoreType , receiverAddress , receiverStoreName , defaultAddress } = props.userReceiveAddress
    const { setUserReceiveAddress , setDefaultReceiveAddress } = props

    // 刪除地址
    const deleteUserReceiveAddress = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/userReceiveAddress/delete`
        const { data } = await axios.delete(url , {
            headers: {
                'Authentication': accessToken
            },
            data: {
                'receiveAddressId': receiveAddressId
            }
        })

        if ( data ) {
            setUserReceiveAddress((prev) => {
                return prev.filter(item => item.receiveAddressId !== receiveAddressId)
            })
        }
    }

    // 將地址設成預設
    const setDefault = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/userReceiveAddress/changeDefaultReceiveAddress`
        const { data } = await axios.post(url,{
            'receiveAddressId': receiveAddressId
        },{
            headers: {
                'Authentication': accessToken
            }
        })

        if( data ){
            setDefaultReceiveAddress((prev) => {
                return prev + 1
            })
        }        
    }

    return (
        <div className="addressItem">
            <div className="receiverName">
                <p>全名 : {receiverName}</p>
                {defaultAddress == 1 ? <p className="defaultAddress">預設</p> : null }
            </div>
            <p>手機 : {receiverCellPhone}</p>
            <p>超商 : {receiverStoreType} {receiverStoreName}</p>
            <p>地址 : {receiverAddress}xx路xx段xx號</p>
            <div className="addressAction">
                <button className="setDefaultAddress" onClick={setDefault}>設定為預設</button>
                <button className="deleteAddress" onClick={deleteUserReceiveAddress}>刪除</button>
            </div>
        </div>
    );
}

export default AddressItem;
