// uuid套件
import { v4 } from 'uuid'
// hook
import { useState , useEffect } from 'react'

const ProductImage = (props) => {
    const { images } = props
    const [ mainImage , setMainImage ] = useState([])


    const changeMainImage = async (image) => {
        setMainImage(image)
    }

    useEffect(() => {

        if(images[0]){
            changeMainImage(images[0].image)

        }    

        //  images[0] ? changeMainImage(images[0].image) : null



    }, [ images ]);    

    return (
        // productImage
        <div className="productImage">
            <div className="mainImage">
                <img src={mainImage} alt="" />
            </div>
            <div className="smallImage">
                {
                    images.map(item => <button key={ v4() } onClick={() => changeMainImage(item.image)}><img src={item.image} alt="圖片" /></button>)
                }
            </div>
        </div>
    );
}

export default ProductImage;
