import style from './CompProductInfoIntroDetail.module.scss';
function CompProductInfoIntroDetail(props) {
    // let info = [];
    // info = props.info || localStorage.getItem("infomation").split(",");

    return (
        <div className={style.detail}>
            <p className={style.title}>Thông số kỹ thuật</p>
            <ul className={style.ul}>
                <li className={style.li}>
                        <span className={style.lable}>CPU: </span>
                        <span className={style.inf}>{props.info[0]}</span>
                </li>
                <li className={style.li}>
                        <span className={style.lable}>RAM: </span>
                        <span className={style.inf}>{props.info[1]}</span>
                </li>
                <li className={style.li}>
                        <span className={style.lable}>ROM: </span>
                        <span className={style.inf}>{props.info[2]}</span>
                </li>
                <li className={style.li}>
                        <span className={style.lable}>Màn hình: </span>
                        <span className={style.inf}>{props.info[3]}</span>
                </li>
                <li className={style.li}>
                        <span className={style.lable}>GPU: </span>
                        <span className={style.inf}>{props.info[4]}</span>
                </li>
                <li className={style.li}>
                        <span className={style.lable}>Hệ điều hành: </span>
                        <span className={style.inf}>{props.info[5]}</span>
                </li>
                <li className={style.li}>
                        <span className={style.lable}>Cổng kết nối: </span>
                        <span className={style.inf}>{props.info[6]}</span>
                </li>
                <li className={style.li}>
                        <span className={style.lable}>Thiết kế: </span>
                        <span className={style.inf}>{props.info[7]}</span>
                </li>
                <li className={style.li}>
                        <span className={style.lable}>Năm sản xuất: </span>
                        <span className={style.inf}>{props.info[8]}</span>
                </li>
            </ul>

            <button className = {style.btn}>Xem đầy đủ</button>
        </div>
    );
}

export default CompProductInfoIntroDetail;
