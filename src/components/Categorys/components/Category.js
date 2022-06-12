// react由套件
import { Link } from "react-router-dom";

const Category = (props) => {
    let categoryName = props.category.categoryName
    let categoryId = props.category.categoryId
    return (
        <Link to={`/category/${categoryId}`}>{categoryName}</Link>
    );
}

export default Category;
