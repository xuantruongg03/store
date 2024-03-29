import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCart } from "../../api/cart";
import CompCart from "./CompCart";
import { deleteProductCart } from "../../api/cart";
import style from "../../Components/Sass/Cart.module.scss";

function Cart() {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [select, setSelect] = useState([]);
  const [selectTitlePay, setSelectTitlePay] = useState([]);
  const [selectPricePay, setSelectPricePay] = useState([]);
  const [selectQuatity, setSelectQuatity] = useState([]);
  const customer_id = localStorage.getItem("customer_id");

  const handleBuy = (e) => {
    if (selectTitlePay.length === 0) {
      alert("Vui lòng chọn sản phẩm!");
      e.preventDefault();
    } else {
      dispatch({
        type: "PAY",
        data: {
          selectTitlePay,
          selectPricePay,
          id_product: select,
          selectQuatity,
        },
      });
    }
  };

  const handleDelete = (e) => {
    if (selectTitlePay.length === 0) {
      alert("Vui lòng chọn sản phẩm!");
      e.preventDefault();
    } else {
      // eslint-disable-next-line array-callback-return
      select.map((id) => {
        const deleteProduct = async () => {
          const params = {
            product_id: id,
            customer_id: localStorage.getItem("customer_id"),
          };
          const res = await deleteProductCart(params);
          let newToken = res.refreshToken;
            if (newToken) {
                localStorage.setItem('token', newToken);
            }
          document.querySelector(".cart-" + id).remove();
          for (let i = 0; i < select.length; i++) {
            if (select[i] === id) {
              select.splice(i, 1);
            }
          }
        };
        deleteProduct();
        window.location.reload();
      });
    }
  };

  const func = {
    setSelect,
    setSelectTitlePay,
    setSelectPricePay,
    setSelectQuatity,
  };
  const value = {
    selectTitlePay,
    selectPricePay,
    selectQuatity,
  };

  useEffect(() => {
    const cart = async () => {
      const res = await getCart(customer_id);
      let newToken = res.refreshToken;
            if (newToken) {
                localStorage.setItem('token', newToken);
            }
      setCart(res.data);
    };
    cart();
  }, [customer_id]);

  return (
    <div className={clsx("container-custom my-5", style.container)}>
      <h1 className="py-3 border-b-2 text-xl uppercase font-semibold border-red-500">
        Giỏ hàng của bạn
      </h1>
      <div className={clsx(" bg-slate-50 mt-5 px-3", style.parent)} style={{ minHeight: "" }}>
        <br />
        {cart.length === 0 ? (
          <div className="flex justify-center items-center flex-col">
            <h1 className={clsx("text-center text-8xl text-red-500 mt-3 font-semibold", style.alert)}>
              GIỎ HÀNG TRỐNG
            </h1>
            <Link
              to={"/"}
              className={clsx("text-center hover:text-red-500 hover:underline font-semibold mt-10", style.alert_2)}
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          ""
        )}
        <table
          className={clsx(cart.length > 0 ? "" : "disabled", "cart w-full", style.box_cart)}
        >
          <thead style={{ color: "red" }}>
            <tr>
              <th>Tên Sản phẩm</th>
              <th>Thông tin sản phẩm</th>
              <th>Giá tiền</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
              <th>Chọn</th>
            </tr>
          </thead>

          {cart.map((item, index) => (
            <CompCart data={item} key={index} func={func} value={value} />
          ))}
        </table>
        <div className={style.box_2}>
            {cart.map((item, index) => (
                <CompCart data={item} key={index} func={func} value={value}/>
            ))}
        </div>
        {cart.length > 0 ? (
          <div className="h-24">
            <Link
              to={"/pay"}
              className={clsx("h-10 w-40 pt-2 font-semibold bg-red-500 hover:bg-white hover:text-red-500 hover:border-red-500 border text-white text-center no-underline rounded-md mb-3 float-right mr-4 mt-5 cursor pointer", style.btnbuy)}
              onClick={handleBuy}
            >
              Thanh Toán
            </Link>
            <button
              className={clsx("h-10 w-28 font-semibold bg-yellow-500 hover:bg-white hover:text-yellow-500 hover:border-yellow-500 border text-white text-center no-underline rounded-md  mb-3 float-right mr-2 mt-5 cursor pointer")}
              onClick={handleDelete}
            >
              Xóa SP
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Cart;
