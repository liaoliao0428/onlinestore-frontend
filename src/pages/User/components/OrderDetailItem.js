const OrderDetailItem = ( props ) => {
    console.log(props.orderDetail);
    const { categoryName , productName , specification , unitPrice , quantity , amount } = props.orderDetail
    return (
        <div className="orderDetailItem">
            <p>{categoryName}</p>
            <p>{productName}</p>
            <p>{specification}</p>
            <p>${unitPrice}</p>
            <p>{quantity}</p>
            <p>{amount}</p>
        </div>
    );
}

export default OrderDetailItem;
