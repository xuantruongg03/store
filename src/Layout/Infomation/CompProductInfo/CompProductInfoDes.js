import style from "./CompProductInfoDes.module.scss";
import clsx from "clsx"

function CompProductInfoDes(props) {
    return (
        <div>
            <p className={clsx(style.title)}>Thông tin sản phẩm</p>
            <p className={style.inf}>Tình trạng: <span className={style.des}>{props.quatity > 1 ? "Còn hàng" : "Hết hàng"}</span> </p>
        </div>
    )
}

export default CompProductInfoDes;