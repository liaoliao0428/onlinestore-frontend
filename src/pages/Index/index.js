import './index.css';

import { useParams } from "react-router-dom";

// 組件
import Banner from './components/Banner.js';
import Products from './components/Products.js';

const Index = () => {

    return (
        <div>
            <Banner />
            <Products />
        </div>

    )
}

export default Index