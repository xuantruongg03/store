import style from "./CompProductInfoIntroDetail.module.scss";
function CompProductInfoIntroDetail(props) {
  return (
      <div className = {style.detail}>
        <p className = {style.title}>Mô tả chi tiết</p>
        <ul className={style.ul}>
            {props.inf.map((detail, index) => (
                <li 
                  className={style.list}
                  key = {index}  
                >
                      {detail}
                </li>
            ))}
      </ul>
      <button className = {style.btn}>Xem đầy đủ mô tả chi tiết</button>
      </div>
  );
}

export default CompProductInfoIntroDetail;
