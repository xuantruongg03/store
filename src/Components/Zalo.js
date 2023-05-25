import style from "./Sass/Zalo.module.scss"
import zalo from "../access/image/zalo.png"

function Zalo() {
  return (
    <div className={style.widget}>
      <a href="https://zalo.me/0981793201" target="blank" rel="nofollow" className={style.img}>
        <img
          className={style.imgZalo}
          src={zalo}
          alt="Liên hệ Zalo:0981793201"
        />
      </a>
    </div>
  );
}

export default Zalo;
