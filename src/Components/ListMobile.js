import { faBars, faClose, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Link } from "react-router-dom";
import style from "../Components/Sass/Header.module.scss";
import list from "../listType";
import zalo from "../access/image/zalo.png"

function ListMobile() {
  const closeNav = () => {
    document.getElementById("nav_mobile").style.display = "none";
  };

  return (
    <div
      id="nav_mobile"
      className={clsx(
        "fixed top-0 left-0 z-30 w-full h-screen bg-white text-sm hidden",
        style.nav_mobile
      )}
    >
      <div className="flex flex-row justify-between items-center h-12 bg-red-500 px-2">
        <div className="flex flex-row items-center">
          <FontAwesomeIcon icon={faBars} className="h-6 w-6 text-white mr-2" />
          <h1 className="uppercase font-semibold text-white">
            Danh mục sản phẩm
          </h1>
        </div>
        <FontAwesomeIcon
          icon={faClose}
          onClick={closeNav}
          className="h-6 w-6 text-white"
        />
      </div>
      <div className="flex flex-col px-2">
        {list.map((item, index) => (
          <Link
            to={item.key !== "repair" ? `/product/type/${item.key}` : "/repair"}
            onClick={closeNav}
            key={index}
            className="flex flex-row items-center h-10"
          >
            <img
              src={item.image}
              alt=""
              className="h-7 w-7 rounded-full mr-3"
            />
            <h1 className="">{item.name}</h1>
          </Link>
        ))}
        <div className="flex flex-col mt-5">
          <Link onClick={closeNav} to={"/"} className=" my-2">
            Trang chủ
          </Link>
          <Link onClick={closeNav} to={"/about"} className=" my-2">
            Giới thiệu
          </Link>
          <Link onClick={closeNav} to={"/products"} className=" my-2">
            Sản phẩm
          </Link>
          <Link onClick={closeNav} to={"/news"} className=" my-2">
            Tin mới nhất
          </Link>
          <Link onClick={closeNav} to={"/repair"} className=" my-2">
            Đặt lịch sửa chữa
          </Link>
          <Link onClick={closeNav} to={"/blog/my-blog"} className=" my-2">
            Bài viết của bạn
          </Link>
          <Link onClick={closeNav} to={"/blog/create"} className=" my-2">
            Viết bài
          </Link>
          {/* <Link onClick={closeNav} to={'/contact'} className=" my-2">Feedback</Link> */}
          <a
            href="https://forms.gle/fJ2gj378ETSupZrHA"
            className=""
            onClick={closeNav} 
            target="_blank"
            rel="noopener noreferrer"
          >
            Feedback
          </a>
        </div>
      </div>
      <div className={clsx("flex justify-center items-center mt-3")}>
        <div className={clsx("flex justify-center items-center mt-3 mr-2")}>
          <FontAwesomeIcon
            icon={faPhone}
            className={clsx(
              " text-red-500 border p-2 rounded-full border-red-500 mr-4",
              style.zoom
            )}
          />
          <div className="flex flex-col">
            <label>Tư vấn hỗ trợ</label>
            <label className="text-red-500 font-bold">0981793201</label>
          </div>
        </div>
        <div className={clsx("flex justify-center items-center mt-3 ml-2")}>
          <img className={clsx(
              " text-red-500 p-2 rounded-full mr-4 h-12 w-12 ",
              style.zoom
            )} src={zalo} alt="Zalo" />
          <div className="flex flex-col">
            <label>Tư vấn hỗ trợ</label>
            <label className="text-red-500 font-bold">0981793201</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListMobile;
