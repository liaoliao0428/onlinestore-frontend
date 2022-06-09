import './index.css';

import Banner from './components/Banner.js';
import Products from './components/Products.js';

const arr = [1, 2, 3, 4, 5, 6]

const Index = () => {
    return (
        <div>
            <Banner />
            <div className="products">
                <div className="wrap">
                    {
                        arr.map(item => <Products />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Index