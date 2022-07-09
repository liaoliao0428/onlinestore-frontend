// react-router-dom
import { Outlet , Navigate } from "react-router-dom";
// cookies
import Cookies from 'js-cookie'
// axios套件
import axios from 'axios'
// URL
import { URL } from '../global/url'
// hook
import { useState , useEffect } from 'react'


const PrivateRoutes = () => {

    const [ auth, setAuth ] = useState(true);

    // 檢查是否有權限
    const authCheck = async () => {

        let accessToken = Cookies.get('accessToken')
        let url = `${URL}/user/reactRouteAuthCheck`
        const { data } = await axios.post(url , {} ,{
            headers: {
                'Authentication': accessToken
            }
        })

        if(!data.authCheck){
            setAuth(data.authCheck);
        }
    } 

    useEffect(() => {
        authCheck()
    }, []);

    return (
        <>
        { 
            auth ? <Outlet /> : <Navigate to="/login" /> 
        }
        </>
    );

}

export default PrivateRoutes;
