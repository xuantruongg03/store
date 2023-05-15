import bcrypt from "bcryptjs";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, } from "react-router-dom";
import fb from "../access/image/fb-login-btn.svg";
import gg from "../access/image/gg-login-btn.svg";
import { loginAPI } from "../api/login";
import style from "../Components/Sass/Login.module.scss";
import clsx from "clsx";

function Login() {
//   const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState(true);
  const ref = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = ref.current.username.value;
    let password = ref.current.password.value;
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.error(err);
        return;
      }
      bcrypt.hash(ref.current.password.value, salt, function (err, hash) {
        if (err) {
          console.error(err);
          return;
        }
        password = hash;
      });
    });

    const login = async () => {
      const params = {
        username: username,
        password: password,
      };
      const res = await loginAPI(params);
      if (res.state) {
        const token = res.token;
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", res.refreshToken);
        localStorage.setItem("customer_id", res.data.customer_id);
        dispatch({ type: "LOGIN", payload: res });
        window.location.href = "/";
      } else {
          alert("Thông tin đăng nhập không chính xác!");
          setState(false);
      }
    };
    login();
  };

  const handleLoginWithFacebook = () => {};

  const handleLoginWithGoogle = () => {};

  return (
    <div className={clsx("flex justify-center items-center my-10 sm:mx-20", style.container)}>
      <div className={clsx("flex border border-red-500", style.box)}>
        <div className="p-5 sm:w-2/3">
          <h1 className="font-semibold text-lg mb-3">Đăng nhập tài khoản</h1>
          {state ? (
            ""
          ) : (
            <p className="text-red-500 mb-2">
              Thông tin đăng nhập không chính xác!
            </p>
          )}
          <form action="" ref={ref}>
            <label htmlFor="username" className="font-semibold mb-4">
              Tên đăng nhập <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="mt-2 mb-4 border border-gray-300 py-2 pl-3 w-full rounded-md focus:outline-none"
              placeholder="Tên đăng nhập"
            />
            <label htmlFor="password" className="font-semibold mt-3">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-2 mb-4 border border-gray-300 py-2 pl-3 w-full rounded-md focus:outline-none"
              placeholder="Mật khẩu"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-yellow-400 uppercase font-semibold tracking-widest text-white p-2 rounded-md w-full mt-4"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          </form>
          <div className="text-center relative my-4">
            <label htmlFor="" className={clsx("text-gray-300 absolute -top-1 left-16 sm:hidden lg:block", style.left)}>
              _________________
            </label>
            <label>Hoặc đăng nhập bằng</label>
            <label
              htmlFor=""
              className={clsx("text-gray-300 absolute -top-1 right-16 sm:hidden lg:block", style.right)}
            >
              _________________
            </label>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={fb}
              alt="Login with Facebook"
              className="h-16 w-32 mr-1 cursor-pointer"
              onClick={handleLoginWithFacebook}
            />
            <img
              src={gg}
              alt="Login with Google"
              className="h-16 w-32 ml-1 cursor-pointer"
              onClick={handleLoginWithGoogle}
            />
          </div>
          <div className="flex justify-center items-center text-sm">
            <p>
              Bạn quên mật khẩu bấm vào{" "}
              <Link to={"/forgot-password"} className="underline text-blue-500">
                đây
              </Link>{"."}
            </p>
          </div>
        </div>
        <div className={clsx("w-1/2 bg-red-500 text-white flex items-center", style.box_child_2)}>
          <div className="w-full">
            <h1 className="text-xl font-semibold text-center uppercase">
              Quyền lợi thành viên
            </h1>
            <ul className="list-disc list-inside ml-5 my-5">
              <li className="my-2">Vận chuyển siêu tốc</li>
              <li className="my-2">Thanh toán an toàn</li>
              <li className="my-2">Đổi trả dễ dàng</li>
              <li className="my-2">Ưu đãi đặc biệt</li>
              <li className="my-2">Tích điểm đổi quà</li>
            </ul>
            <div className="flex justify-center mt-3">
              <Link
                to={"/register"}
                className="py-2 px-4 border border-white rounded hover:bg-yellow-400 font-semibold"
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
