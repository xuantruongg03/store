import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import formatsMoney from "../Convert/ConvertMoneyVND";
import slug from "../Convert/ConvertStringVNtoTitle";
import { addToCart } from "../api/cart";
import { addLikeProduct, unlikeProduct } from "../api/products";
import style from "./Sass/Product.module.scss";
import clsx from "clsx";

function ProductMobile(props) {
    const navigate = useNavigate();
    const state = useSelector((state) => state.login);
    const stateLogin = state !== null ? state.state : false;
    const [stateLike, setStateLike] = useState(props.stateLike);

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
            let newToken = res.refreshToken;
            if (newToken) {
                localStorage.setItem('token', newToken);
            }
            if (res.message === 'ok') {
                alert('Đặt hàng thành công! Hãy kiểm tra giỏ hàng của bạn.');
            } else {
                alert('Lỗi phía Client! Thử lại sau.');
            }
        };
        add();
    } else {
        alert('Bạn cần đăng nhập để thực hiện chức năng này');
        navigate('/login');
    }
  };

  const like = () => {
    if(!stateLogin) {
        alert('Bạn cần đăng nhập để thực hiện chức năng này');
        navigate('/login');
   }
   console.log(stateLike);
   if (stateLike === false) {
    const fetch = async () => {
        const res = await addLikeProduct({product_id: props.productID});
        if (res.message === 'ok') {
            if(res.refreshToken != null) {
                localStorage.setItem('refresh_token', res.refreshToken);
            }
            if (res.newToken != null) {
                localStorage.setItem('token', res.newToken);
            }
            alert('Đã thêm vào yêu thích');
            setStateLike(true);
        }
    }
    fetch();
   } else {
        const unlike = async () => {
            const res = await unlikeProduct({product_id: props.productID});
            if (res.message === 'ok') {
                if(res.refreshToken != null) {
                    localStorage.setItem('refresh_token', res.refreshToken);
                }
                if (res.newToken != null) {
                    localStorage.setItem('token', res.newToken);
                }
                alert('Đã xóa khỏi yêu thích');
                setStateLike(false);
            }
        }
        unlike();
   }

  }

  return (
    <div className="relative flex flex-col mb-5 border items-center ">
      {Number(props.sale) !== 0 ? (
        <div
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 50% 70%, 0 100%, 0 0)",
          }}O
          className="h-16 w-11 bg-yellow-500 absolute top-0 left-0 text-center flex flex-col text-sm font-semibold z-10"
        >
          <label htmlFor="">Giảm</label>
          <label className="">{Number(props.sale).toFixed(1)}%</label>
        </div>
      ) : (
        ""
      )}
      <div className={clsx("absolute flex top-0 right-0 w-7 h-7 rounded-lg z-20 bg-yellow-500 justify-center items-center", style.like)} title="Thêm vào yêu thích">
            <FontAwesomeIcon icon={faHeart} className={clsx("h-4 w-4 border-yellow-500 cursor-pointer hover:text-red-500", stateLike ? "text-red-500" : "text-white")} onClick={like}/>
        </div>
      <Link to={`/product/${slug(props.name)}?search=${props.productID}`} className="mt-2">
        <img
          src={props.img.file_path}
          alt={`product-${props.productID}`}
          id={`product-${props.productID}`}
          className=" -z-10 h-full w-full object-cover"
          title={props.name}
        />
      </Link>
      <Link
        to={`/product/${slug(props.name)}?search=${props.productID}`}
        className="mt-2 w-full font-bold text-center text-xs truncate px-2"
      >
        <p
          htmlFor={`product-${props.productID}`}
          className="hover:text-red-500 hover:cursor-pointer overflow-hidden truncate"
          title={props.name}
        >
          {props.name}
        </p>
      </Link>
      <div className="flex items-center justify-center h-12 w-full">
        <div className="sm:pl-2">
          <p
            htmlFor={`product-${props.productID}`}
            className="text-red-500 font-semibold text-xs text-center"
          >
            {formatsMoney(props.price - (props.price * props.sale) / 100)}
          </p>
          {Number(props.sale) !== 0 ? (
            <p
              htmlFor={`product-${props.productID}`}
              className="text-gray-500 line-through text-xs text-center"
            >
              {formatsMoney(props.price)}
            </p>
          ) : (
            ""
          )}
        </div>
        <div
          className= "ml-1 hover:bg-red-500 hover:cursor-pointer py-2 rounded-md px-3 hover:text-white group transform scale-100 object-fit"
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

export default ProductMobile;
