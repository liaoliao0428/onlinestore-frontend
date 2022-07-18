// axios
import axios from "axios";
// Cookie
import Cookies from "js-cookie";
// URL
import { URL } from "../../../global/url";

const ChangeAddressItem = ( props ) => {
    
    const { receiveAddressId , receiverName , receiverCellPhone , receiverStoreType , receiverStoreName , receiverAddress ,  defaultAddress } = props.userReceiveAddress
    const { setChangeAddressModalOpen , setSelectedAddressId } = props

    const selectAddress = async () => {
        setChangeAddressModalOpen(false)
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/userReceiveAddress/changeDefaultReceiveAddress`
        const { data } = await axios.post(url,{
            'receiveAddressId': receiveAddressId
        },{
            headers: {
                'Authentication': accessToken
            }
        })

        if ( data ) {
            setChangeAddressModalOpen(false)
            setSelectedAddressId(receiveAddressId)
        }
    }

    return (
        <div className="changeAddressItem">
            <div className="receiverName">
                <p>全名 : {receiverName}</p>
                {defaultAddress == 1 ? <p className="selectedAddress">使用中</p> : null }
            </div>
            <p>手機 : {receiverCellPhone}</p>
            <p>超商 : {receiverStoreType} {receiverStoreName}</p>
            <p>地址 : {receiverAddress}xx路xx段xx號</p>
            <button className="selectAddress" onClick={selectAddress}>選擇</button>
        </div>
    );
}

export default ChangeAddressItem;
