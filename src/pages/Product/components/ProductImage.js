// uuid套件
// import { v4 } from 'uuid'
// hook
import { useState , useEffect } from 'react'

const ProductImage = (props) => {
    const { images } = props
    const [ mainImage , setMainImage ] = useState([])


    const changeMainImage = (image) => {
        setMainImage(image)
    }

    useEffect(() => {
        if(images[0]){
            changeMainImage(images[0].image)
        }
    }, [ images ]);    

    return (
        // productImage
        <div className="productImage">
            <div className="mainImage">
                <img src={mainImage} alt="大圖" />
            </div>
            <div className="smallImage">
                {
                    images.map(item => <div><button key={ item.id } onClick={() => changeMainImage(item.image)}><img src={item.image} alt="圖片" /></button></div>)
                }
            </div>
        </div>
    );
}

export default ProductImage;
