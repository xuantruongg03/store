import {
  faBars,
  faCaretDown,
  faMagnifyingGlass,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/products";
import { getUserAPI } from "../api/user";
import style from "./Sass/Header.module.scss";
import formatsMoney from "../Convert/ConvertMoneyVND";
import slug from "../Convert/ConvertStringVNtoTitle";

const type = [
  {
    id: 1,
    name: "Máy tính để bàn",
    image: require("../access/image/types/pc.jpg"),
  },
  {
    id: 2,
    name: "Máy tính xách tay",
    image: require("../access/image/types/laptop.jpg"),
  },
  {
    id: 3,
    name: "Màn hình máy tính",
    image: require("../access/image/types/mirror.jpg"),
  },
  {
    id: 4,
    name: "Ghế gaming",
    image: require("../access/image/types/ghe.jpg"),
  },
  {
    id: 5,
    name: "Phụ kiện",
    image: require("../access/image/types/phukien.jpg"),
  },
  {
    id: 6,
    name: "Thiết bị mạng",
    image: require("../access/image/types/mang.jpg"),
  },
  {
    id: 7,
    name: "Đặt lịch sữa chữa",
    image: require("../access/image/types/suachua.jpg"),
  },
];

function Header() {
  const [statDropDown, setStateDropDown] = useState(false);
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

  const handleDropDown = () => {
    setStateDropDown(!statDropDown);
  };

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
    window.location.href = "/";
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
    console.log(result);
  };

  useEffect(() => {
    const getData = async () => {
      const resProducts = await getAllProducts();
      setProducts(resProducts.data);
      if (resProducts.login) {
        // setStateLogin(resProducts.login);
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
    <header className="relative">
      <div className="flex justify-around lg:mx-20 md:mx-5 items-center">
        <div className="flex flex-row items-center">
          <Link to={"/"}>
            <img
              src={require("../access/image/logo.png")}
              alt="Logo"
              className="lg:h-20 md:h-16"
            />
          </Link>
          <Link to={"/"}>
            <h1 className="lg:text-xl md:text-base font-bold ml-4 uppercase text-red-400 no-underline ">
              Computer Central
            </h1>
          </Link>
        </div>
        <div className="flex flex-row items-center relative sm:hidden md:block">
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
                        <Link to={`/${slug(item.product_name)}?search=${item.product_id}`} key={item.product_id} onClick={() => { document.getElementById('search').value = ''; setResult(null) }}>
                            <div className="flex flex-row items-center p-2 hover:bg-gray-200 cursor-pointer">
                                <img
                                    src={item.product_images[0].file_path}
                                    alt="Avatar"
                                    className="lg:h-11 md:h-8 lg:w-11 md:w-8 mr-3 border rounded-full border-red-500"
                                />
                                <div className="flex flex-col">
                                    <label className="cursor-pointer">{item.product_name}</label>
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
        <div className="flex-row items-center sm:hidden lg:flex">
          <FontAwesomeIcon
            icon={faPhone}
            className={clsx(
              "lg:h-6 lg:w-6 lg:mx-4 md:mx-2 text-red-500 border p-2 rounded-full border-red-500",
              style.zoom
            )}
          />
          <div className="flex flex-col">
            <label>Tư vấn hỗ trợ</label>
            <label className="text-red-500 font-bold">1900 1008</label>
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
          <div className="flex flex-col md:test-sm lg:text-base">
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
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center relative md:hidden mx-24 my-3">
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
                        <Link to={`/${slug(item.product_name)}?search=${item.product_id}`} key={item.product_id} onClick={() => { document.getElementById('search').value = ''; setResult(null) }}>
                            <div className="flex flex-row items-center p-2 hover:bg-gray-200 cursor-pointer">
                                <img
                                    src={item.product_images[0].file_path}
                                    alt="Avatar"
                                    className="h-20 w-20 mr-3 border rounded-full border-red-500"
                                />
                                <div className="flex flex-col text-base">
                                    <label className="cursor-pointer">{item.product_name}</label>
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

      <nav className="flex-row justify-around p-2 bg-red-500 relative sm:hidden lg:flex">
        <div className="flex flex-row items-center ml-32 relative">
          <FontAwesomeIcon
            icon={faBars}
            className="h-4 w-4 mr-3 text-white cursor-pointer"
            onClick={handleDropDown}
          />
          <h1
            className="text-white text-sm font-bold cursor-pointer disable-select"
            onClick={handleDropDown}
          >
            Danh mục sản phẩm
          </h1>
          <div
            className={clsx(
              "absolute bg-white w-52 top-8 z-20 pb-2 dropdown_menu",
              statDropDown ? "" : "hidden"
            )}
            id="drop-down"
          >
            <ul className="ml-2">
              {type.map((item, index) => {
                return (
                  <li className="flex flex-row items-center mt-3" key={index}>
                    <img
                      src={item.image}
                      alt={item.name}
                      id={item.name}
                      className="h-6 w-6 rounded-full mr-3"
                    />
                    <Link to={`/${item.name}`}>
                      <label
                        className="cursor-pointer hover:text-red-500"
                        htmlFor={item.name}
                      >
                        {item.name}
                      </label>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <span className="text-white">|</span>
        <ul className="flex flex-row w-2/3 justify-around mr-24">
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
            <Link to={"/"} className="text-white hover:text-orange-300">
              Sản phẩm
              <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
            </Link>
          </li>
          <li>
            <Link to={"/news"} className="text-white hover:text-orange-300">
              Tin mới nhất
              <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
            </Link>
          </li>
          <li>
            <Link to={"/faq"} className="text-white hover:text-orange-300">
              Câu hỏi thường gặp
            </Link>
          </li>
          <li>
            <Link to={"/recruit"} className="text-white hover:text-orange-300">
              Tuyển dụng
            </Link>
          </li>
          <li>
            <Link to={"/contact"} className="text-white hover:text-orange-300">
              Liên hệ
            </Link>
          </li>
        </ul>
        {show ? (
          <div className="absolute top-0 right-28 w-36 dropdown_menu bg-white border border-red-500 flex flex-col justify-center text-sm z-20">
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
      </nav>
    </header>
  );
}

export default Header;
