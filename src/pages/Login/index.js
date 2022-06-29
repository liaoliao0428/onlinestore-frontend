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
    );
}

export default Login;
