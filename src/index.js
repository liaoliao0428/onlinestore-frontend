import React from 'react';
import ReactDOM from 'react-dom/client';
// 路由套件
import { BrowserRouter , Routes , Route , Navigate } from 'react-router-dom'

// css
import './index.css';

// components 一般組件
import Header from './components/Header'; // 頭(搜尋bar、使用者登入/資訊)
import Categorys from './components/Categorys'; // 分類標籤
import Footer from './components/Footer'; // 底層介紹

// components 路由組件
import Index from './pages/Index'; // 首頁
import Product from './pages/Product'; // 單個商品頁面

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// 畫面渲染
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Categorys />
      {/* 註冊路由 */}
      <Routes >
          {/* 無指定路由就帶到首頁 */}
          <Route path='/' element={<Navigate to='/index' />} />
          {/* 首頁 */}
          <Route path='/index' element={<Index />}/>
          {/* 單商品頁 */}
          <Route path='/product/:productId' element={<Product />}/>
          {/* 指定分類頁 */}
          <Route path='/category/:categoryId' element={<Index />}/>
      </Routes> 
      {/* 註冊路由 */}
      <Footer />
    </BrowserRouter>
  </React.StrictMode>    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
