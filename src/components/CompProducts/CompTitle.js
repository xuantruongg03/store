import { Link } from "react-router-dom";
import slug from "src/Convert/ConvertStringVNtoTitle";
import "./CompTitles.css"

function CompTitle(props) {
    return(
        <div className="div-title">
            <h4 className="style">{props.title}</h4>
            <Link to= {slug(props.title)}><span className="span">Xem tất cả &gt;&gt;&gt;</span></Link>
        </div>
    )
}

export default CompTitle;