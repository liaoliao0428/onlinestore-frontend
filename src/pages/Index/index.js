import './index.css';

import { useParams } from "react-router-dom";

// 組件
import Banner from './components/Banner.js';
import Products from './components/Products.js';

const Index = (props) => {

    let { categoryId } = useParams()

    return (
        <div>
            <Banner />
            <Products categoryId={categoryId}/>
        </div>
    )
}

export default Index