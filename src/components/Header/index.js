// 路由組件
import { Link , useNavigate } from 'react-router-dom'
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
// hooks
import { useState , useEffect , useRef } from 'react'
// cookies
import Cookies from 'js-cookie'
// axios套件
import axios from 'axios'
// URL
import { URL } from '../../global/url'
// v4
import { v4 } from 'uuid'

import './index.css';

import Result from './components/Result'

const Header = () => {
    const history = useNavigate();
    const [ loginState , setLoginState ] = useState(0)
    const [ userImage , setUserImage ] = useState('http://fakeimg.pl/30x30')
    const [ userName , setUserName ] = useState()
    const [ keyWord , setKeyWord ] = useState('')
    const [ searchResult , setSearchResult ] = useState([])
    const [ searchResultAreaShow , setSearchResultAreaShow ] = useState('')
    const searchResultRef = useRef()
    const searchRef = useRef()

    // 網址轉換就撈一次個人資料
    useEffect(() => {
        const accessToken = Cookies.get('accessToken')
        if(accessToken){
            getUserInfo(accessToken)
        }        
    }, [ history ]);

    // 關鍵字變動就打api搜尋
    useEffect(() => {
        searchKeyword()
    }, [ keyWord ]);

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
            setLoginState(0)
            history('/login')
        } 
    }

    // 改變關鍵字搜尋值
    const changeSearchKeyword = (e) => {
        setKeyWord(e.target.value)
    }
    
    // 關鍵字搜尋
    const searchKeyword = async () => {
        const url = `${URL}/product/searchKeyword`
        const { data } = await axios.post(url,{
            'keyWord': keyWord
        })
        
        if (data) {
            setSearchResult(data.searchResult)
        }
    }

    // 搜尋bar 失去focus
    const focusOnSearchResult = () => {
        searchResultRef.current.focus()
    }

    const clearSearchResult = () => {
        setSearchResultAreaShow('none')
    }

    // 點集搜尋bar show 出搜尋結果
    const showSearchResult = () => {
        setSearchResultAreaShow('')
    }

    // 清除關鍵字
    const clearKeyword = () => {
        setKeyWord('')
    }

    // 搜尋關鍵字
    const submitKeyword = () => {
        history(`/index/search?keyword=${keyWord}`)
    }

    let loginComponent
    {
        if(loginState === 0)
            loginComponent = <Link type="button" className="login-logout" to="/login">登入/註冊</Link>
        else
            loginComponent = <Link to="/user/profile" type="button" className="userIcon"><img src={userImage} alt="" /><p>{userName}</p></Link>
    } 

    return (
        // header
        <div className="header" >
            <div className="wrap">
                <div className="search">
                    {/* search */} 
                    <Link to="/index" className='toInedx' onClick={clearKeyword}>點我到首頁</Link>
                    <div className='searchResult'>
                        <input className="search-bar" type="text" placeholder="輸入商品" value={keyWord} onChange={(e) => changeSearchKeyword(e)} onFocus={showSearchResult} ref={searchRef} onBlur={focusOnSearchResult} />
                        <div className='searchResultArea' tabIndex='0' style = {{ display: `${searchResultAreaShow}`}} ref={searchResultRef} onBlur={clearSearchResult}>
                            {
                                searchResult ? searchResult.map(item => <Result key={ v4() } searchResult={ item } setKeyWord={setKeyWord} setSearchResultAreaShow={setSearchResultAreaShow}/>) : null
                            }
                        </div>
                    </div>                    
                    <button className="search-submit" onClick={submitKeyword}>搜尋</button>
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