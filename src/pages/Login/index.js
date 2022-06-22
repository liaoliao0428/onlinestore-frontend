// 路由組件
import { Route , Routes } from 'react-router-dom'

// 組件
import Signin from './components/Signin'; // 登入
import Signup from './components/Signup'; //註冊
import Froget from './components/Froget'; // 忘記密碼

// css
import './index.css'

const Login = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/forget' element={<Froget />} />
            </Routes>
        </div>

        // <div className='login'>
        //     <div className='wrap'>
        //         <h2>登入</h2>
        //         <form>
        //             <input type="text" placeholder='輸入帳號'/>
        //             <input type="password" placeholder='輸入密碼'/>
        //             <button>登入</button>
        //         </form>    
        //         <Link to='/login/forget' className='forget'>忘記密碼</Link>
        //         <div className='signup'>
        //             <Link to='/login/signup'>免費註冊</Link>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Login;
