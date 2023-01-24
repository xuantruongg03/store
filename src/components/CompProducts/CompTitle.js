import { Link } from "react-router-dom";
import slug from "src/Convert/ConvertStringVNtoTitle";
import style from "./CompTitle.module.scss";

function CompTitle(props) {
    return(
        <div className={style.divTitle}>
            <h4 className={style.style}>{props.title}</h4>
            <Link to= {slug(props.subkey)}><span className={style.span}>Xem tất cả &gt;&gt;&gt;</span></Link>
        </div>
    )
}

export default CompTitle;