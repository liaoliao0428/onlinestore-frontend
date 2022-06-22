// 路由組件
import { Link } from 'react-router-dom'

const Signin = () => {
    return (
        <div className='signin'>
            <div className='wrap'>
                <h2>登入</h2>
                <form>
                    <input type="text" placeholder='輸入信箱'/>
                    <input type="password" placeholder='輸入密碼'/>
                    <button>登入</button>
                </form>    
                <Link to='/login/forget' className='forget'>忘記密碼</Link>
                <div className='signup'>
                    <Link to='/login/signup'>免費註冊</Link>
                </div>
            </div>
        </div>
    );
}

export default Signin;
