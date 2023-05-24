import {
  faBars,
  faCaretDown,
  faCartShopping,
  faHeart,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatsMoney from "../Convert/ConvertMoneyVND";
import slug from "../Convert/ConvertStringVNtoTitle";
import { getAllProducts } from "../api/products";
import { getUserAPI } from "../api/user";
import list from "../listType";
import style from "./Sass/Header.module.scss";

function Header() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.login);
  const [data, setData] = useState(
    state !== null ? (state.state !== false ? state.data : null) : null
  );
  const [stateLogin, setStateLogin] = useState(
    state != null ? state.state : false
  );
  const [products, setProducts] = useState();
  const [result, setResult] = useState();
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState();

  const handleLogout = () => {
    setStateLogin(false);
    dispatch({
      type: "LOGIN",
      payload: {
        state: false,
        data: null,
      },
    });
    localStorage.removeItem("token");
    localStorage.removeItem("customer_id");
    localStorage.removeItem("refresh_token");
    window.location.reload();
  };

  const showMenu = () => {
    setShow(!show);
  };

  const search = (e) => {
    if (e.target.value !== "") {
      let result = products.filter((products) =>
        products.product_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      if (result.length === 0) {
        setResult(null);
      } else {
        setResult(result);
      }
    } else {
      setResult(null);
    }
    // console.log(result);
  };

  useEffect(() => {
    const getData = async () => {
      const resProducts = await getAllProducts();
      setProducts(resProducts.data);
      if (resProducts.newToken != null) {
        localStorage.setItem("token", resProducts.newToken);
      }
      if (resProducts.refreshToken != null) {
        localStorage.setItem("refresh_token", resProducts.refreshToken);
      }
      if (resProducts.login) {
        let data = await getUserAPI(resProducts.customer_id);
        setData(data.data[0]);
        setAvatar(data.data[0].avatar);
        dispatch({
          type: "LOGIN",
          payload: {
            state: true,
            data: {
              customer_id: data.customer_id,
            },
          },
        });
      }
    };
    getData();
  }, [dispatch]);

  return (
    <header className="relative border-b-4 sm:border-none border-red-500">
      <div className={clsx("py-1 bg-red-500 text-white text-sm px-24 overflow-hidden")}>
        <p className={style.alert}>
          Website đang trong quá trình xây dựng. Hãy sử dụng máy tính để có trải nghiệm tốt nhất! Nếu bạn có góp ý vui lòng gửi
          phản hồi cho chúng tôi. Sự góp ý của bạn là niềm vinh hạnh cho chúng
          tôi!
        </p>
      </div>
      <div
        className={clsx(
          "flex justify-around lg:mx-20 md:mx-5 items-center mb-2",
          style.logo_login
        )}
      >
        <div className={clsx("flex flex-row items-center", style.logo)}>
          <Link to={"/"}>
            <img
              src={require("../access/image/logo.png")}
              alt="Logo"
              className="lg:h-20 md:h-16 h-20 w-32"
            />
          </Link>
          <Link to={"/"}>
            <h1
              className={clsx(
                "lg:text-xl md:text-base font-bold ml-4 uppercase text-red-400 no-underline ",
                style.name
              )}
            >
              Computer Central
            </h1>
          </Link>
        </div>
        <div
          className={clsx(
            "flex flex-row items-center relative sm:hidden md:block ",
            style.input
          )}
        >
          <input
            type="search"
            placeholder="Tìm kiếm sản phẩm"
            className="border border-red-500 p-1 pl-2 rounded text-gray-500 focus:outline-none lg:w-72 md:w-40 md:text-sm md:ml-1"
            onChange={search}
            id="search"
          />
          <div>
            {result ? (
              <div className="absolute top-10 z-30 left-0 lg:w-72 md:w-54 text-xs bg-white border border-red-500 rounded">
                {result.splice(0, 5).map((item) => (
                  <Link
                    to={`/${slug(item.product_name)}?search=${item.product_id}`}
                    key={item.product_id}
                    onClick={() => {
                      document.getElementById("search").value = "";
                      setResult(null);
                    }}
                  >
                    <div className="flex flex-row items-center p-2 hover:bg-gray-200 cursor-pointer">
                      <img
                        src={item.product_images[0].file_path}
                        alt="Avatar"
                        className="lg:h-11 md:h-8 lg:w-11 md:w-8 mr-3 border rounded-full border-red-500"
                      />
                      <div className="flex flex-col">
                        <label className="cursor-pointer">
                          {item.product_name}
                        </label>
                        <label className="text-red-500 font-bold mt-1">
                          {formatsMoney(item.product_price)} VNĐ
                        </label>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={clsx(
            "flex-row items-center sm:hidden lg:flex",
            style.contact
          )}
        >
          <FontAwesomeIcon
            icon={faPhone}
            className={clsx(
              "lg:h-6 lg:w-6 lg:mx-4 md:mx-2 text-red-500 border p-2 rounded-full border-red-500",
              style.zoom
            )}
          />
          <div className="flex flex-col">
            <label>Tư vấn hỗ trợ</label>
            <label className="text-red-500 font-bold">0981793201</label>
          </div>
        </div>
        <div className="flex flex-row items-center">
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="h-11 w-11 mr-3 border rounded-full border-red-500"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              className="h-6 w-6 mr-4 text-red-500 border p-2 rounded-full border-red-500"
            />
          )}
          <div className="flex flex-col md:test-sm lg:text-base relative">
            <label className="">Xin chào!</label>
            {stateLogin || data ? (
              <p
                className="text-red-500 font-bold cursor-pointer"
                onClick={showMenu}
              >{`${data.first_name} ${data.last_name}`}</p>
            ) : (
              <Link to={"/login"} className="text-red-500 font-bold">
                Đăng nhập
              </Link>
            )}
            {show ? (
              <div className="absolute top-12 -right-5 w-36 dropdown_menu bg-white border border-red-500 flex flex-col justify-center text-sm z-20">
                <Link
                  to={`/account`}
                  className="no-underline p-3 cursor-pointer hover:text-white hover:bg-red-500"
                  onClick={showMenu}
                >
                  Tài khoản
                </Link>
                <Link
                  to={`/cart`}
                  className="no-underline p-3 cursor-pointer hover:text-white hover:bg-red-500"
                  onClick={showMenu}
                >
                  Giỏ hàng
                </Link>
                <div
                  className="no-underline p-3 cursor-pointer hover:text-white hover:bg-red-500"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </div>
              </div>
            ) : null}
          </div>
          <div className="ml-5 hidden sm:block">
            <Link to={"/like"}>
                <FontAwesomeIcon
                    icon={faHeart}
                    className="h-6 w-6 mr-3 text-red-500 cursor-pointer"
                />
            </Link>
            <Link to={"/cart"}>
                <FontAwesomeIcon
                    icon={faCartShopping}
                    className="h-6 w-6 mr-3 text-red-500 cursor-pointer"
                />
            </Link>
            
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "flex flex-row items-center relative md:hidden mx-24 my-3",
          style.input_res
        )}
      >
        <input
          type="search"
          placeholder="Tìm kiếm sản phẩm"
          className="border border-red-500 p-2 pl-2 rounded text-gray-500 focus:outline-none w-full"
          onChange={search}
          id="search"
        />
        <div>
          {result ? (
            <div className="absolute top-10 z-30 left-0 w-full bg-white border border-red-500 rounded">
              {result.splice(0, 5).map((item) => (
                <Link
                  to={`/${slug(item.product_name)}?search=${item.product_id}`}
                  key={item.product_id}
                  onClick={() => {
                    document.getElementById("search").value = "";
                    setResult(null);
                  }}
                >
                  <div className="flex flex-row items-center p-2 hover:bg-gray-200 cursor-pointer">
                    <img
                      src={item.product_images[0].file_path}
                      alt="Avatar"
                      className="h-20 w-20 mr-3 border rounded-full border-red-500"
                    />
                    <div className="flex flex-col text-base">
                      <label className="cursor-pointer">
                        {item.product_name}
                      </label>
                      <label className="text-red-500 font-bold mt-1">
                        {formatsMoney(item.product_price)} VNĐ
                      </label>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <nav
        id="nav"
        className={clsx(
          "flex-row justify-around p-2 bg-red-500 relative sm:hidden lg:flex",
          style.nav
        )}
      >
        <div
          className={clsx(
            "flex flex-row items-center ml-32 relative",
            style.product
          )}
        >
          <FontAwesomeIcon
            icon={faBars}
            className="h-4 w-4 mr-3 text-white cursor-pointer"
            // onClick={handleDropDown}
          />
          <h1
            className="text-white text-sm lg:text-base font-bold cursor-pointer disable-select"
            // onClick={handleDropDown}
          >
            Danh mục sản phẩm
          </h1>
          <div
            className={clsx(
              "absolute bg-red-500 w-56 -left-4 top-6 z-20 pb-1 hidden dropdown_menu",
              style.product_dropdown
            )}
          >
            {list.map((item, index) => {
              return (
                <div key={index} className="flex my-2 px-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    id={item.name}
                    className="h-6 w-6 rounded-full mr-3"
                  />
                  <Link to={item.key !== 'repair' ? `/product/type/${item.key}` : '/repair'}>
                    <label
                      className="cursor-pointer text-white hover:text-orange-300"
                      htmlFor={item.name}
                    >
                      {item.name}
                    </label>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <span className="text-white">|</span>
        <ul className="flex flex-row w-2/3 justify-around items-center mr-24 text-sm: text-base">
          <li>
            <Link to={"/"} className=" text-white hover:text-orange-300">
              Trang chủ
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="text-white hover:text-orange-300">
              Giới thiệu
            </Link>
          </li>
          <li>
            <Link
              to={"/product"}
              className={clsx(
                "text-white hover:text-orange-300 relative",
                style.product
              )}
            >
              Sản phẩm
            </Link>
          </li>
          <li>
            <Link to={"/news"} className="text-white hover:text-orange-300">
              Tin mới nhất
              {/* <FontAwesomeIcon icon={faCaretDown} className="ml-1" /> */}
            </Link>
          </li>
          <li>
            <Link to={"/repair"} className="text-white hover:text-orange-300">
              Đặt lịch sửa chữa
            </Link>
          </li>
          <li>
            <Link
              to={"/blog/my-blog"}
              className={clsx(
                "text-white hover:text-orange-300 relative",
                style.product
              )}
            >
              Bài viết của bạn
              <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
              <div
                className={clsx(
                  "absolute bg-red-500 w-44 top-6 z-20 pb-1 -left-4 hidden dropdown_menu",
                  style.product_dropdown
                )}
              >
                <div className="my-2 px-3">
                  <Link
                    to={"/blog/my-blog"}
                    className="cursor-pointer text-white hover:text-orange-300"
                  >
                    Bài viết của bạn
                  </Link>
                </div>
                <div className="my-2 px-3">
                  <Link
                    to={"/blog/create"}
                    className="cursor-pointer text-white hover:text-orange-300"
                  >
                    Viết bài
                  </Link>
                </div>
              </div>
            </Link>
          </li>
          <li>
            {/* <Link to={"/contact"} className="text-white hover:text-orange-300">
              Liên hệ
            </Link> */}
            <a
              href="https://forms.gle/fJ2gj378ETSupZrHA"
              className="text-white hover:text-orange-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Feedback
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
