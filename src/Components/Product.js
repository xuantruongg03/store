import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import formatsMoney from "../Convert/ConvertMoneyVND";
import slug from "../Convert/ConvertStringVNtoTitle";
import { addToCart } from "../api/cart";
import style from "./Sass/Product.module.scss";

function Product(props) {
    const navigate = useNavigate();
    const state = useSelector((state) => state.login);
    const stateLogin = state !== null ? state.state : false;

  const handleAddToCart = () => {
    if (stateLogin) {
        const product_id = props.productID;
        const quantity = 1;
        const customer_id = localStorage.getItem('customer_id');
        const add = async () => {
            const params = {
                product_id,
                quantity,
                customer_id,
            };
            const res = await addToCart(params);
            if (res.message === 'ok') {
                alert('Đặt hàng thành công! Hãy kiểm tra giỏ hàng của bạn.');
            } else {
                alert('Lỗi phía Client! Thử lại sau.');
            }
        };
        add();
    } else {
        navigate('/login');
    }
  };

  return (
    <div className="relative flex flex-col mx-7 mb-5 border py-3 px-7">
      {Number(props.sale) !== 0 ? (
        <div
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 50% 70%, 0 100%, 0 0)",
          }}
          className="h-16 w-11 bg-yellow-500 absolute top-0 left-0 text-center flex flex-col text-sm font-semibold z-10"
        >
          <label htmlFor="">Giảm</label>
          <label className="">{Number(props.sale).toFixed(1)}%</label>
        </div>
      ) : (
        ""
      )}
      <Link to={`/${slug(props.name)}?search=${props.productID}`}>
        <img
          src={props.img.file_path}
          alt={`product-${props.productID}`}
          id={`product-${props.productID}`}
          className="w-48 h-48 hover:transform hover:scale-110 -z-10"
          style={{ transition: "transform 0.2s" }}
          title={props.name}
        />
      </Link>
      <Link
        to={`/${slug(props.name)}?search=${props.productID}`}
        className="w-48 h-24 mt-2 font-bold text-center"
      >
        <p
          htmlFor={`product-${props.productID}`}
          className="hover:text-red-500 hover:cursor-pointer "
          title={props.name}
        >
          {props.name}
        </p>
      </Link>
      <div className="flex items-center justify-center h-12">
        <div>
          <p
            htmlFor={`product-${props.productID}`}
            className="text-red-500 font-semibold text-lg"
          >
            {formatsMoney(props.price - (props.price * props.sale) / 100)}
          </p>
          {Number(props.sale) !== 0 ? (
            <p
              htmlFor={`product-${props.productID}`}
              className="text-gray-500 text-sm line-through"
            >
              {formatsMoney(props.price)}
            </p>
          ) : (
            ""
          )}
        </div>
        <div
          className={clsx(
            "ml-5 hover:bg-red-500 hover:cursor-pointer py-2 rounded-md px-3 hover:text-white group transform scale-100 object-fit",
            style.animationZoom
          )}
          title="Mua ngay"
          onClick={handleAddToCart}
        >
          <FontAwesomeIcon
            icon={faCartPlus}
            className="text-gray-500 group-hover:text-white"
          />
        </div>
      </div>
    </div>
  );
}

export default Product;
