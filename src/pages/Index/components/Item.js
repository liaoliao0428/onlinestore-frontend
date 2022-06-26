import { Link } from 'react-router-dom'

const Item = (props) => {

    let productId = props.product.productId
    let productName = props.product.productName
    let price = Math.floor(props.product.price)
    let imageUrl = props.product.imageUrl

    return (
        <div className="item">
            <Link to={`/product/${productId}`}>
                <img src={imageUrl} alt="" />
                <h3>{productName}</h3>
                <p>NT ${price}</p>
            </Link>
        </div>
    );
}

export default Item;
