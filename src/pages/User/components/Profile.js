import { Fragment } from 'react';
// URL
import { URL } from '../../../global/url'
// axios套件
import axios from 'axios'
// hook
import { useState , useEffect } from 'react'
// cookies
import Cookies from 'js-cookie'

const Profile = () => {
    const [userName , setUserName] = useState('')
    const [mail , setMail] = useState('')
    const [phone , setPhone] = useState('')
    const [gender , setGender] = useState(3)
    const [birthDay , setBirthDay] = useState('')
    const [userImage , setuserImage] = useState('http://fakeimg.pl/120x120')

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

    // 取得使用者資料
    const getUserData = async (accessToken) => {
        let url = `${URL}/user/getUserData`
        const { data } = await axios.post(url , {
            'accessToken': accessToken
        })
        
        if(data.userData){
            const { userName , mail , phone , gender , birthDay , userImage } = data.userData
            setUserName(userName)
            setMail(mail)
            setGender(gender)

            if(phone){
                setPhone(phone)
            }            

            if(birthDay){
                setBirthDay(birthDay)
            }

            if(userImage){
                setuserImage(userImage)
            }
        }    
    }

    useEffect(() => {
        const accessToken = Cookies.get('accessToken')
        if(accessToken){
            getUserData(accessToken)
        } 
    }, []);
    
    // 更新使用者資料
    const updateUserProfile = async () => {
        const accessToken = Cookies.get('accessToken')
        let url = `${URL}/user/updateUserData`
        let userData = {
            'userName':  userName,
            'mail': mail,
            'phone': phone,
            'gender': gender,
            'birthDay': birthDay
        }

        const { data } = await axios.patch(url , {
            accessToken: accessToken,
            userData: userData
        })

        if(data){
            alert('資料更新成功')
        }
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
                        <select value={gender} onChange={(e) => {changeGender(e)}}>
                            <option value="1" >男</option>
                            <option value="2" >女</option>
                            <option value="3" >其他</option>
                        </select>
                    </div>
                    <div className="birthDay">
                        <p>生日 : </p>
                        <input type="date" value={birthDay} onChange={(e) => {changeBirthDay(e)}}/>
                    </div>
                    <button onClick={updateUserProfile}>儲存</button>
                </div>
                <div className='userImage'>
                    <img src={userImage} alt="使用者相片" />
                    <label type='button'><input type="file" hidden/>選擇照片</label>
                </div>
            </div>
        </Fragment>
    );
}

export default Profile;