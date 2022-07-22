import React from 'react';
import ReactDOM from 'react-dom/client';
// 路由套件
import { BrowserRouter as Router , Routes , Route , Navigate } from 'react-router-dom'

// css
import './index.css';
// 輪播圖css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// PrivateRoutes
import PrivateRoutes from './urils/PrivateRoutes';

// components 一般組件
import Header from './components/Header'; // 頭(搜尋bar、使用者登入/資訊)
import Categorys from './components/Categorys'; // 分類標籤
import Footer from './components/Footer'; // 底層介紹

// components 路由組件
import Index from './pages/Index'; // 首頁
import Product from './pages/Product'; // 單個商品頁面
// Login組件
import Login from './pages/Login'; // 登入頁面

// User組件
import User from './pages/User'; // 登入頁面

// Cart組件
import Cart from './pages/Cart'; // 購物車組件

// Checkout組件
import Checkout from './pages/Checkout';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// 畫面渲染
// React.StrictMode
root.render(
  <>
    <Router >
      <Header />
      <Categorys />
      {/* <div style={{height: "100vh"}}> */}
        {/* 註冊路由 */}
        <Routes >
            {/* 無指定路由就帶到首頁 */}
            <Route path='/*' element={<Navigate to='/index' />} />
            {/* 登入 */}
            <Route path='/login' element={<Login />}/>
            {/* 首頁 */}
            <Route path='/index/*' element={<Index />}/>
            {/* 單商品頁 */}
            <Route path='/product/:productId' element={<Product />}/>
            {/* 指定分類頁 */}
            <Route path='/category/:categoryId' element={<Index />}/>

            {/* route導航 確認都有權限才可以進到這個頁面 */}
            <Route element={ <PrivateRoutes /> }>
              {/* 會員頁面 */}
              <Route path='/user/*' element={<User />} />
              {/* 購物車 */}
              <Route path='/cart' element={<Cart />} />
              {/* 結帳畫面 */}
              <Route path='/checkout/*' element={<Checkout />} />
            </Route>      
        </Routes> 
        {/* 註冊路由 */}
      {/* </div> */}
      <Footer />
    </Router>
  </>    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
