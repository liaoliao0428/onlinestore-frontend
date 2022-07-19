// 路由組件
import { Link , useNavigate } from 'react-router-dom'
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
// hooks
import { useState , useEffect } from 'react'
// cookies
import Cookies from 'js-cookie'
// axios套件
import axios from 'axios'

// URL
import { URL } from '../../global/url'

import './index.css';


const Header = () => {
    const history = useNavigate();
    const [loginState , setLoginState] = useState(0)
    const [userImage , setUserImage] = useState('http://fakeimg.pl/30x30')
    const [userName , setUserName] = useState()

    // 取得使用者基本資料
    const getUserInfo = async (accessToken) => {
        let url = `${URL}/user/getUserBasicData`

        const { data } = await axios.post(url , {} ,{
            headers: {
                'Authentication': accessToken
            }
        })

        if(data.userBasicData){
            const { userImage , userName } = data.userBasicData

            if(userImage){
                setUserImage(userImage)
            }

            setUserName(userName)
            setLoginState(1)
        }else{
            history('/login')
        } 
    }

    useEffect(() => {
        const accessToken = Cookies.get('accessToken')
        if(accessToken){
            getUserInfo(accessToken)
        }        
    }, [ history ]);


    let loginComponent
    {
        if(loginState === 0)
            loginComponent = <Link type="button" className="login-logout" to="/login">登入/註冊</Link>
        else
            loginComponent = <Link to="/user/profile" type="button" className="userIcon"><img src={userImage} alt="" /><p>{userName}</p></Link>
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
                    <Link to="/cart" className="shopping-cart"><FontAwesomeIcon icon={faCartShopping} /></Link>
                </div>
            </div>        
        </div>
    )
}

export default Header