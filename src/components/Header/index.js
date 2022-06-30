// 路由組件
import { Link } from 'react-router-dom'
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
// hooks
import { useState , useEffect } from 'react'
// cookies
import Cookies from 'universal-cookie';
// axios套件
import axios from 'axios'

// URL
import { URL } from '../../global/url'



import './index.css';


const Header = () => {
    const [loginState , setLoginState] = useState(0)
    const [userImage , setUserImage] = useState('http://fakeimg.pl/30x30')
    const [userName , setUserName] = useState('testUser')
    const cookies = new Cookies();

    

    // 取得使用者基本資料
    const getUserInfo = async (accessToken) => {
        let url = `${URL}/user/getUserBasicData`
        let response = await axios.post(url,{
            accessToken: accessToken
        })

        if(response.data.userBasicData.userImage){
            setUserImage(response.data.userBasicData.userImage)
        }
        setUserName(response.data.userBasicData.userName)
        
        if(userImage && userName){
            setLoginState(1)
        }
    }

    useEffect(() => {
        let accessToken = cookies.get('accessToken')
        if(accessToken){
            getUserInfo(accessToken)
        }        
    }, []);

    let loginComponent
    {
        if(loginState == 0)
            loginComponent = <Link type="button" className="login-logout" to="/login">登入/註冊</Link>
        else
            loginComponent = <Link to="/user/userInfo" type="button" className="userIcon" ><img src={userImage} alt="" /><p>{userName}</p></Link>
    } 

    return (
        // header
        <div className="header">
            <div className="wrap">
                <div className="search">
                    {/* search */} 
                    <Link to="/index">點我到首頁</Link>
                    <form action="">
                        <input className="search-bar" type="text" placeholder="輸入商品" />
                        <input className="search-submit" type="submit" value="搜尋" />
                    </form>
                </div>
                {/* userinfo */}
                <div className="userinfo">
                    {
                        loginComponent
                    }
                    <a href="" className="shopping-cart"><FontAwesomeIcon icon={faCartShopping} /></a>
                </div>
            </div>        
        </div>
    )
}

export default Header