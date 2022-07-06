const CheckoutItem = (props) => {

    const { productDetailId , image , productName , specification , unitPrice , quantity } = props.productDetail

    return (
        <div className='checkoutProductItem'>
            <div className='checkoutProductBasic'>
                <img src={image} alt="商品縮圖" />
                <p>{productName}</p>
                <p>{specification}</p>
            </div>            
            <p>${unitPrice}</p>
            <p className='quantity'>{quantity}</p>
            <p>${unitPrice * quantity}</p>
        </div>
    );
}

export default CheckoutItem;
