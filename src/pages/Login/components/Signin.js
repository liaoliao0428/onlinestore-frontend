// 路由組件
import { Link } from 'react-router-dom'
// axios套件
import axios from 'axios'
// hook
import { useState , useEffect } from 'react'
// URL
import { URL } from '../../../global/url'
// cookies
import Cookies from 'universal-cookie';

const Signin = () => {
    const [mail , setMail] = useState('')
    const [password , setPassword] = useState('')
    const cookies = new Cookies();

    const changeMail = (e) => {
        setMail(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    // 登入
    const signin = async () => {
        let url = `${URL}/user/signin`
        let response = await axios.post(url,{
            mail: mail,
            password: password
        })

        // 回傳signin狀態如果是true 代表登入成功 false代表失敗
        if(response.data.signin){
            // accessToken存入cookie 設定過期時間
            cookies.remove("accessToken")
            let inFifteenMinutes = new Date(new Date().getTime() + 24 * 3600 * 1000);//一天
            cookies.set("accessToken",response.data.accessToken,{expires: inFifteenMinutes})
            // 轉址
            if(cookies.get('accessToken')){
                window.location.href = '/user/userInfo'
            }
            
        }else{
            alert(response.data.message)
            return false
        }     
    }

    return (
        <div className='signin'>
            <div className='wrap'>
                <h2>登入</h2>
                <input type="text" placeholder='輸入信箱' onChange={(e) => changeMail(e)} value={mail}/>
                <input type="password" placeholder='輸入密碼'  onChange={(e) => changePassword(e)} value={password}/>
                <button onClick={signin}>登入</button>   
                <Link to='/login/forget' className='forget'>忘記密碼</Link>
                <div className='signup'>
                    <Link to='/login/signup'>免費註冊</Link>
                </div>
            </div>
        </div>
    );
}

export default Signin;
