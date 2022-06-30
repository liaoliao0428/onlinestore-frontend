import { Fragment } from 'react';

const UserInfo = () => {
    console.log('個人資訊');

    return (
        <Fragment>
            <h2>我的檔案</h2>
            <div className='info'>
                <div className="userInfo">
                    <div className="userName">
                        <p>使用者名稱 : </p>
                        <input type="text" />
                    </div>
                    <div className="mail">
                        <p>mail : </p>
                        <input type="text" />
                    </div>
                    <div className="phone">
                        <p>手機 : </p>
                        <input type="text" />
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