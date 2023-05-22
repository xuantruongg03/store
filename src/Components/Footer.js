import { Link } from "react-router-dom";
import slug from "../Convert/ConvertStringVNtoTitle";
import style from "./Sass/Footer.module.scss"
import clsx from "clsx";
import payment1 from "../access/image/payment/payment1.png";
import payment2 from "../access/image/payment/payment2.png";
import payment3 from "../access/image/payment/payment3.png";
import payment4 from "../access/image/payment/payment4.png";
import payment5 from "../access/image/payment/payment5.png";

const inf = [
  "Đơn vị chủ quản: Siêu thị điện tử Computer Central",
  "Mobile: 0981793201",
  "Email: computercentralqn@gmail.com",
  "Địa chỉ: Chưa có địa chỉ",
  "Website: http://www.computercentralqn.vn/",
];

const support = ["Giới thiệu", "Chính sách đổi trả", "Hỗ trợ mua hàng", "Hỗ trợ bảo hành"];

function Footer() {
  return (
    <footer className={clsx("sm:text-sm md:text-base", style.footer)}>
      <div className={clsx("border-t h-64 bg-white flex justify-evenly ", style.box)}>
        <div className={style.box_logo} >
          <img
            className={clsx("mt-9 md:w-48 md:h-24 sm:w-24 sm:h-20", style.logo)}
            src={require("../access/image/logo.png")}
            alt="logo"
          />
          <h3 className="text-center text-red-500 uppercase text-xl font-semibold sm:text-sm md:text-lg">
            Hotline: 0981793201
          </h3>
        </div>

        <ul className={clsx("mt-9", style.inf)}>
          {inf.map((inf, index) => (
            <li style={{ padding: "0" }} key={index}>
              {inf}
            </li>
          ))}
        </ul>
        <div className={style.help}>
          <p className="mt-9 text-red-500 uppercase font-semibold">
            Hỗ trợ khách hàng
          </p>
          {support.map((item, index) => (
            <li key={index} style={{ padding: "0" }}>
              <Link to={slug(item)} className="decoration-none hover:text-red-500">
                {item}
              </Link>
            </li>
          ))}
        </div>
        <div className={clsx("m-1 sm:hidden md:block", style.payment)}>
          <p className="mt-9 text-red-500 uppercase font-semibold">
            Hình thức thanh toán
          </p>
          <div className=" flex flex-wrap w-56">
            <img
              className="gap-1 mx-1 my-2"
              src={payment1}
              alt="payment"
            />
            <img
              className="gap-1 mx-1 my-2"
              src={payment2}
              alt="payment"
            />
            <img
              className="gap-1 mx-1 my-2"
              src={payment3}
              alt="payment"
            />
            <img
              className="gap-1 mx-1 my-2"
              src={payment4}
              alt="payment"
            />
            <img
              className="gap-1 mx-1 my-2"
              src={payment5}
              alt="payment"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
