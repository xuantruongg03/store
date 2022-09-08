import style from "./CompProductInfoDes.module.scss";
import clsx from "clsx"

function CompProductInfoDes(props) {
    return (
        <div>
            <p className={clsx(style.title)}>Thông tin sản phẩm</p>
            <p className={style.inf}>Màu sắc: <span className={style.des}>Đỏ</span> </p>
            <p className={style.inf}>Tình trạng: <span className={style.des}>Còn hàng</span> </p>
        </div>
    )
}

export default CompProductInfoDes;