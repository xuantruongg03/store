import { Link } from "react-router-dom";
import slug from "../Convert/ConvertStringVNtoTitle";

const inf = [
  "Đơn vị chủ quản: Siêu thị điện tử Computer Central",
  "Mobile: 0981793201",
  "Email: computercentralqn@gmail.com",
  "Địa chỉ: Chưa có địa chỉ",
  "Website: http://www.computercentralqn.vn/",
];

const support = ["Giới thiệu", "Chính sách đổi trả", "Hỗ trợ mua hàng"];

function Footer() {
  return (
    <footer className="sm:text-sm md:text-base">
      <div className="border-t h-64 bg-white flex justify-evenly">
        <div>
          <img
            className="mt-9 md:w-48 md:h-24 sm:w-24 sm:h-20"
            src={require("../access/image/logo.png")}
            alt="logo"
          />
          <h3 className="text-center text-red-500 uppercase text-xl font-semibold sm:text-sm">
            Hotline: 0981793201
          </h3>
        </div>

        <ul className="mt-9">
          {inf.map((inf, index) => (
            <li style={{ padding: "0" }} key={index}>
              {inf}
            </li>
          ))}
        </ul>
        <div>
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
        <div className="m-1 sm:hidden md:block">
          <p className="mt-9 text-red-500 uppercase font-semibold">
            Hình thức thanh toán
          </p>
          <div className=" flex flex-wrap w-56">
            <img
              className="gap-1 mx-1 my-2"
              src="http://t0338.store.nhanh.vn/tp/T0338/img/payment1.png"
              alt="payment"
            />
            <img
              className="gap-1 mx-1 my-2"
              src="http://t0338.store.nhanh.vn/tp/T0338/img/payment2.png"
              alt="payment"
            />
            <img
              className="gap-1 mx-1 my-2"
              src="http://t0338.store.nhanh.vn/tp/T0338/img/payment4.png"
              alt="payment"
            />
            <img
              className="gap-1 mx-1 my-2"
              src="http://t0338.store.nhanh.vn/tp/T0338/img/payment5.png"
              alt="payment"
            />
            <img
              className="gap-1 mx-1 my-2"
              src="http://t0338.store.nhanh.vn/tp/T0338/img/payment3.png"
              alt="payment"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
