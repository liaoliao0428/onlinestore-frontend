const Buyinfo = () => {
    return (
        // buyinfo
        <div class="buyinfo">
            <h1>測試商品</h1>
            <h2>NT$ 100</h2>
            <select class="" name="" id="">
                <option value="">選擇商品規格</option>
                <option value="">選擇規格</option>
                <option value="">選擇規格</option>
                <option value="">選擇規格</option>
            </select>
            <h3>數量</h3>
            <input type="number" name="" id="" value="1" />
            <h3>剩餘xxxx件</h3>
            <button class="buynow">直接購買</button>
            <button class="cart"><i class="fa-solid fa-cart-shopping"></i> 放入購物車</button>
            <p>付款後，從備貨到寄出商品為 3 個工作天。（不包含假日）</p>
            <p>商成統一使用綠界發票</p>
        </div>
    );
}

export default Buyinfo;
