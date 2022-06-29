// css
import './index.css'
// hook
import { useState , useEffect } from 'react'
// 路由套件
import { Link , Routes , Route , useLocation } from 'react-router-dom'

// 組件
import UserInfo from './components/UserInfo'
import Address from './components/Address'
import Order from './components/Order'

const User = () => {
    let data = useLocation()

    let pathname = data.pathname

    let splitPathname = pathname.split("/");

    const userData = splitPathname[2]

    return (
        <div className="user">
            <div className="wrap">
                <div className='menu'>
                    <Link to='/user/userInfo' className={userData === "userInfo" ? 'activeMenu' : ''} >個人資訊</Link>
                    <Link to='/user/address' className={userData === "address" ? 'activeMenu' : ''}>寄貨地址</Link>
                    <Link to='/user/order' className={userData === "order" ? 'activeMenu' : ''}>訂單管理</Link>
                </div>
                <div className='userData'>                    
                    <Routes>
                        <Route path='/userInfo' element={<UserInfo/>}/>
                        <Route path='/address' element={<Address />}/>
                        <Route path='/order' element={<Order />}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default User;
