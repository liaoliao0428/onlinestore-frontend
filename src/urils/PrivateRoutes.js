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

// const authCheck = async (setAuth) => {
    
//     let accessToken = Cookies.get('accessToken')
//     let url = `${URL}/user/reactRouteAuthCheck`

//     let response = await axios.post(url , {
//         'accessToken': accessToken
//     })
//     setAuth(response.data)
// }

const PrivateRoutes = () => {
    // const [auth , setAuth] = useState(true)
    // useEffect(() => {
    //     authCheck(setAuth)
    // }, []);
    
    // useEffect(() => {
    //     console.log(auth);
    // }, [auth]);

    const auth = true

    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateRoutes;
