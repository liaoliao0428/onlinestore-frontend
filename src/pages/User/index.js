// css
import './index.css'
// hook
import { useState , useEffect } from 'react'
// 路由套件
import { Link , useParams , Routes , Route , Outlet ,useLocation } from 'react-router-dom'

// 組件
import UserInfo from './components/UserInfo'
import Address from './components/Address'
import Order from './components/Order'

const User = () => {
    let data = useLocation ()
    console.log(data);

    const { userData } = useParams()
    console.log(123);

    return (
        <div className="user">
            <div className="wrap">
                <div className='menu'>
                    <Link to='/user/userInfo' className={userData === "userInfo" ? 'activeMenu' : ''} >個人資訊</Link>
                    <Link to='/user/address' className={userData === "address" ? 'activeMenu' : ''}>寄貨地址</Link>
                    <Link to='/user/order' className={userData === "order" ? 'activeMenu' : ''}>訂單管理</Link>
                </div>
                <div className='userData'>
                    <Outlet />
                    {/* <div className='userInfo'>

                    </div>
                    <div className='address'>

                    </div>
                    <div className='order'>

                    </div> */}
                    
                    {/* <Routes>
                        <Route path='userInfo' element={<UserInfo/>}/>
                        <Route path='address' element={<Address />}/>
                        <Route path='order' element={<Order />}/>
                    </Routes> */}
                </div>
            </div>
        </div>
    );
}

export default User;
