import React from 'react';
import ReactDOM from 'react-dom/client';

// css
import './index.css';

// components
import Header from './components/Header';
import Category from './components/Category';
import Footer from './components/Footer';

import App from './App';
import reportWebVitals from './reportWebVitals';

// 首頁
import Index from './pages/Index';
// 單商品頁
import Product from './pages/Product';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Category />
    <Index />
    <Footer />
  </React.StrictMode>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
