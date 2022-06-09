import './index.css';

import ProductImage from './components/ProductImage.js';
import Buyinfo from './components/Buyinfo.js';

const Product = () => {
    return (
        <div className="product">
            <div className="wrap">
                <ProductImage />
                <Buyinfo />
            </div>            
        </div>
    );
}

export default Product;





