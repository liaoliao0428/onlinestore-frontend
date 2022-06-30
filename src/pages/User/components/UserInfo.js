import { Fragment } from 'react';
// URL
import { URL } from '../../../global/url'
// axios套件
import axios from 'axios'
// hook
import { useState , useEffect } from 'react'
// cookies
import Cookies from 'universal-cookie';

const UserInfo = () => {
    const [userName , setUserName] = useState('')
    const [mail , setMail] = useState('')
    const [phone , setPhone] = useState('')
    const [gender , setGender] = useState('')
    const [birthDay , setBirthDay] = useState('')
    const [userImage , setuserImage] = useState('')
    const cookies = new Cookies();


    const getUserData = async (accessToken) => {
        let url = `${URL}/user/getUserData`
        let response = await axios.post(url , {
            accessToken: accessToken
        })

        setUserName(response.data.userData.userName)
        setMail(response.data.userData.mail)
        setPhone(response.data.userData.phone)
        setGender(response.data.userData.gender)
        setBirthDay(response.data.userData.birthDay)
        setuserImage(response.data.userData.userImage)
    }

    useEffect(() => {
        let accessToken = cookies.get('accessToken')
        if(accessToken){
            getUserData(accessToken)
        } 
    }, []);

    const changeUserName = (e) => {
        setUserName(e.target.value)
    }

    const changEmail = (e) => {
        setMail(e.target.value)
    }

    const changePhone = (e) => {
        setPhone(e.target.value)
    }

    const changeGender = (e) => {
        setGender(e.target.value)
    }

    const changeBirthDay = (e) => {
        setBirthDay(e.target.value)
    }

    const changeUserImage = (e) => {
        setuserImage(e.target.value)
    }

    return (
        <Fragment>
            <h2>我的檔案</h2>
            <div className='info'>
                <div className="userInfo">
                    <div className="userName">
                        <p>使用者名稱 : </p>
                        <input type="text" value={userName} onChange={(e) => changeUserName(e)}/>
                    </div>
                    <div className="mail">
                        <p>mail : </p>
                        <input type="text" value={mail} onChange={(e) => changEmail(e)}/>
                    </div>
                    <div className="phone">
                        <p>手機 : </p>
                        <input type="text" value={phone} onChange={(e) => changePhone(e)}/>
                    </div>
                    <div className="gender">
                        <p>性別 : </p>
                        <select>
                            <option value="1" >男</option>
                            <option value="2" >女</option>
                            <option value="3" >其他</option>
                        </select>
                    </div>
                    <div className="birthDay">
                        <p>生日 : </p>
                        <input type="date" />
                    </div>
                    <button>儲存</button>
                </div>
                <div className='userImage'>
                    <img src="http://fakeimg.pl/120x120" alt="使用者相片" />
                    <label type='button'><input type="file" hidden/>選擇照片</label>
                </div>
            </div>
        </Fragment>
    );
}

export default UserInfo;