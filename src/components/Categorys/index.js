// axios套件
import axios from 'axios'
// hook
import { useState , useEffect } from 'react'
// uuid
import { v4 } from 'uuid';

// URL位址
import { URL } from '../../global/url.js'

// css
import './index.css';

// 組件
import Category from './components/Category.js';



// Categorys組件
const Categorys = () => {

    // 建立categorys hook
    const [categorys, setCategorys] = useState([])

    // 取得所有分類
    const getCategorys = async () => {
        let url = `${URL}/category/all`
        let response = await axios.post(url)
        const { category } = response.data
        setCategorys(category)
    }

    // 用useEffect生命週期概念一開始先抓分類資料
    useEffect(() => {
        getCategorys()
    }, []);

    return (
        <div className="categorys">
            <div className="wrap">
                <nav>
                    {
                        categorys.map(item => <Category key={ v4() } category={item}/>)
                    }
                </nav>            
            </div>
        </div>
    )
}

export default Categorys