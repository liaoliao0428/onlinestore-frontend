import {Link , BrowserRouter , Route} from 'react-router-dom'

const Products = () => {
    return (
        <div className="item">
            <BrowserRouter>
                <Link to="/product">
                    <img src="http://fakeimg.pl/200x200" alt="" />
                    <h3>title</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, porro.</p>
                </Link>
            </BrowserRouter>
        </div>
    )
}

export default Products