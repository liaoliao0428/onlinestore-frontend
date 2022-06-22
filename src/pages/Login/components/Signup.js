// 路由套件
import { Link } from 'react-router-dom'
// axios套件
import axios from 'axios'
// hook
import { useState , useEffect } from 'react'
// URL
import { URL } from '../../../global/url'

const Signup = () => {

    const [mail , setMail] = useState('')
    const [verifyNumber , setVerifyNumber] = useState('')
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [repassword , setRepassword] = useState('')

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
        let response = await axios.post(`${URL}/user/sendVerifyMail`,{
            mail: mail
        });
        console.log(response);
    }

    // 檢查註冊資料
    const checkSignupData = async () => {
        if(!mail){
            alert('信箱未填')
            return null
        }

        if(!verifyNumber){
            alert('驗證碼未填')
            return null
        }

        if(!userName){
            alert('用戶名稱未填')
            return null
        }

        if(!password){
            alert('信箱未填')
            return null
        }

        if(!repassword){
            alert('確認密碼未填')
            return null
        }

        if(password !== repassword){
            alert('密碼與確認密碼不符')
            return null
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

        console.log(response);
    }

    return (
        <div className='signup'>
            <div className='wrap'>
                <h2>註冊</h2>
                <input type="text" value={mail} onChange={(e) => changeMail(e)} placeholder='輸入信箱 範例 : xxxx@gmail.com'/>
                <div className='verify'>
                    <input type="text" value={verifyNumber} onChange={(e) => changeVerifyNumber(e)} className='veriftInput' placeholder='輸入驗證碼'/>
                    <button className='verifyButton' onClick={getVerifyNumber}>取得驗證碼</button>
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
