// axios
import axios from "axios";
// URL
import { URL } from "../../../global/url";
// Cookies
import Cookies from "js-cookie";
// hook
import { useState , useEffect } from "react";
// changeAddressItem
import ChangeAddressItem from "./ChangeAddressItem";

const ChangeAddressModal = ( props ) => {

    const [ userReceiveAddress , setUserReceiveAddress ] = useState([])
    const { setChangeAddressModalOpen , setSelectedAddressId } = props

    // 撈使用者收件地址資料
    useEffect(() => {
        getUserReceiveAddress()
    },[])

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

    return (
        <div className="changeAddressModalBackground">
            <div className="changeAddressModalContainer">
                <div className="changeAddressModalCloseBtn">
                    <h2>選擇物流</h2>
                    <button onClick={() => {setChangeAddressModalOpen(false)}}>X</button>
                </div>
                <div className="changeAddress">
                    {
                        userReceiveAddress.map(item => <ChangeAddressItem key={ item.receiveAddressId } userReceiveAddress={ item } setChangeAddressModalOpen={setChangeAddressModalOpen} setSelectedAddressId={setSelectedAddressId}/>)
                    }
                </div>
            </div>
        </div>
    );
}

export default ChangeAddressModal;