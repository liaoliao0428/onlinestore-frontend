// 路由套件
import { Link } from 'react-router-dom'
// axios套件
import axios from 'axios'
// hook
import { useState , useEffect } from 'react'
// URL
import { URL } from '../../../global/url'
// cookies
import Cookies from 'universal-cookie';

const Signup = () => {

    // var buttonColor = {
    //     backgroundColor: '#cacaca'
	// };

    const [mail , setMail] = useState('')
    const [verifyNumber , setVerifyNumber] = useState('')
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [repassword , setRepassword] = useState('')
    const cookies = new Cookies();


    // 驗證碼按鈕定時器 待做
    // const [buttonState , setButtonState] = useState('')
    // const [] = useState(10)
    // 驗證碼按鈕定時器 待做


    // 改變信箱
    const changeMail = (e) => {
        setMail(e.target.value)
    }

    // 改變驗證碼
    const changeVerifyNumber = (e) => {
        setVerifyNumber(e.target.value)
    }

    // 改變用戶名稱
    const changeUserName = (e) => {
        setUserName(e.target.value)
    }

    // 改變密碼
    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    // 改變確認密碼
    const changeRepassword = (e) => {
        setRepassword(e.target.value)
    }

    // 取得驗證碼
    const getVerifyNumber = async () => {
        // 信箱格式驗證
        let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!reg.test(mail)){
            alert("信箱格式錯誤");
            return false
        }

        let response = await axios.post(`${URL}/UserMailVerify/sendVerifyMail`,{
            mail: mail
        });

        if(response.data.mailExist){
            alert(response.data.mailExist)
            return false
        }
    }


    // 檢查註冊資料
    const checkSignupData = async () => {

        if(!mail){
            alert('信箱未填')
            return false
        }

        let mailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!mailReg.test(mail)){
            alert("信箱格式錯誤");
            return false
        }

        if(!verifyNumber){
            alert('驗證碼未填')
            return false
        }

        if(!userName){
            alert('用戶名稱未填')
            return false
        }

        if(!password){
            alert('密碼未填')
            return false
        }

        let passwordReg=/^(?![^a-zA-Z] $)(?!\D $)/
        if(!passwordReg.test(password) || password.length < 8){
            alert("密碼格式錯誤");
            return false
        }

        if(!repassword){
            alert('確認密碼未填')
            return false
        }

        if(password !== repassword){
            alert('密碼與確認密碼不符')
            return false
        }
        
        await signup()
    }

    // 註冊
    const signup = async () => {
        let response = await axios.post(`${URL}/user/signup`,{
            mail: mail,
            verifyNumber: verifyNumber,
            userName: userName,
            password: password,
        });

        if(response.data.mailCheck){
            alert(response.data.mailCheck)
            return null
        }

        // accessToken存入cookie 設定過期時間
        let inFifteenMinutes = new Date(new Date().getTime() + 24 * 3600 * 1000);//一天
        cookies.set("accessToken",response.data.accessToken,{expires: inFifteenMinutes})
        // 轉址
        window.location.href = '/index'
    }

    return (
        <div className='signup'>
            <div className='wrap'>
                <h2>註冊</h2>
                <input type="text" value={mail} onChange={(e) => changeMail(e)} placeholder='輸入信箱 範例 : xxxx@gmail.com'/>
                <div className='verify'>
                    <input type="text" value={verifyNumber} onChange={(e) => changeVerifyNumber(e)} className='veriftInput' placeholder='輸入驗證碼'/>
                    <button className='verifyButton' onClick={getVerifyNumber}  >取得驗證碼</button>
                </div>
                <input type="text" value={userName} onChange={(e) => changeUserName(e)} placeholder='輸入用戶名稱'/>
                <input type="password" value={password} onChange={(e) => changePassword(e)} placeholder='輸入密碼'/>
                <input type="password" value={repassword} onChange={(e) => changeRepassword(e)} placeholder='再次輸入密碼'/>
                <button onClick={checkSignupData}>註冊</button>
            </div>
        </div>
    );
}

export default Signup;
