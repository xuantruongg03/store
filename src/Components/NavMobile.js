import { faBars, faCartShopping, faHeart, faHouse, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import style from "./Sass/NavMobile.module.scss"
import clsx from "clsx";

function NavMobile() {
  return (
    <div className={clsx("flex flex-row fixed bottom-0 z-20 w-full bg-slate-50 h-16 items-center", style.nav)}>

      <Link className="flex flex-col py-1 w-1/5 items-center" to={'/'}>
        <FontAwesomeIcon className="text-red-500 h-5 w-5" icon={faHouse} id="home" />
        <label className="text-xs mt-1" htmlFor="home">Trang chủ</label>
      </Link>

      <button className="flex flex-col py-1 w-1/5 items-center ">
        <FontAwesomeIcon className="text-red-500 h-5 w-5" icon={faBars} id="bas" />
        <label className="text-xs mt-1" htmlFor="bas">Danh mục</label>
      </button>

      <Link className="flex flex-col py-1 w-1/5 items-center " to={'/cart'}>
        <FontAwesomeIcon className="text-red-500 h-5 w-5" icon={faCartShopping} id="cart" />
        <label className="text-xs mt-1" htmlFor="cart">Giỏ hàng</label>
      </Link>

      <Link className="flex flex-col py-1 w-1/5 items-center " to={'/news'}>
        <FontAwesomeIcon className="text-red-500 h-5 w-5" icon={faNewspaper} id="news" />
        <label className="text-xs mt-1" htmlFor="news">Tin tức</label>
      </Link>

      <Link className="flex flex-col py-1 w-1/5 items-center " to={'/like'}>
        <FontAwesomeIcon className="text-red-500 h-5 w-5" icon={faHeart} id="like" />
        <label className="text-xs mt-1" htmlFor="like">Yêu thích</label>
      </Link>
    </div>
  );
}

export default NavMobile;
