// 輪播圖
import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,  // 一次顯示幾張
    slidesToScroll: 1 // 按下一頁的時候，要跑幾張
};

const Banner = () => {
    return (
        // {/* banner */}
        <Slider {...settings} className='slider'>
            <div className="banner">
                <img src="http://fakeimg.pl/1250x400" alt="" />        
            </div>
            <div className="banner">
                <img src="http://fakeimg.pl/1250x400" alt="" />        
            </div>
            <div className="banner">
                <img src="http://fakeimg.pl/1250x400" alt="" />        
            </div>          
        </Slider>

    )
}

export default Banner