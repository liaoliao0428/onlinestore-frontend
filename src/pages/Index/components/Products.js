// 路由套件
import { Link } from 'react-router-dom'

const Products = () => {
    return (
        <div className="item">
                <Link to="/product">
                    <img src="http://fakeimg.pl/200x200" alt="" />
                    <h3>title</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, porro.</p>
                </Link>
        </div>
    )
}

export default Products