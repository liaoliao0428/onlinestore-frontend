// 路由組件
import { Link } from 'react-router-dom'

const Result = ( props ) => {

    const { productName } = props.searchResult
    const { setKeyWord , setSearchResultAreaShow } = props

    const clickResult = () => {
        setKeyWord(productName)
        setSearchResultAreaShow('none')
    }

    return (
        <Link to={`/index/search?keyword=${productName}`} className='result' onClick={clickResult}>{productName}</Link>
    );
}

export default Result;
