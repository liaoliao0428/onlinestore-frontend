// 路由組件
import { Link } from 'react-router-dom'
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

import './index.css';


const Header = () => {
    return (
        // header
        <div className="header">
            <div className="wrap">
                {/* search */}
                <div className="search">
                    <form action="">
                        <input className="search-bar" type="text" placeholder="輸入商品" />
                        <input className="search-submit" type="submit" value="搜尋" />
                    </form>
                </div>
                {/* userinfo */}
                <div className="userinfo">
                    <Link type="button" className="login-logout" to="/login">登入/註冊</Link>
                    <a href="" className="shopping-cart"><FontAwesomeIcon icon={faCartShopping} /></a>
                </div>
            </div>        
        </div>
    )
}

export default Header