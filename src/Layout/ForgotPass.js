import { useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassAPI, getCapchaAPI } from "../api/user";
import bcrypt from "bcryptjs";

function ForgotPass() {
  const ref = useRef();
  const [showCapcha, setShowCapcha] = useState(false);
  const [state, setState] = useState(true);
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPass = (e) => {
    e.preventDefault();
    const username = ref.current.username.value;
    const email = ref.current.email.value;
    const capcha = ref.current.capcha.value;
    let passhash = bcrypt.hashSync(ref.current.password.value, 10);
    if (username === "" || email === "" || capcha === "") {
      setState(false);
    } else {
      const forgot = async () => {
        const params = {
            username: username,
            email: email,
            code: capcha,
            password: passhash,
          }
        const res = await changePassAPI(params);
        setLoading(true);
        if (res.message === "ok") {
          setState(true);
            setLoading(false);
          navigate("/login");
        } else {
          setState(false);
        }
      };
      forgot();
    }
  };

  const handleGetCapCha = (e) => {
    e.preventDefault();
    const username = ref.current.username.value;
    const email = ref.current.email.value;
    if (username === "" || email === "") {
      setState(false);
    } else {
      const get = async () => {
        const res = await getCapchaAPI({
          username: username,
          email: email,
        });
        setLoading(true);
        // console.log(res);// --> ok
        if (res.message === "ok") {
          setState(true);
          setShowCapcha(true);
            setLoading(false);
        } else {
          setState(false);
        }
      };
      get();
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="container-custom">
      <div className="flex justify-center items-center my-10 full">
        <div className="flex border border-red-500">
          <div className="p-5">
            <h1 className="font-semibold text-lg mb-3">Quên mật khẩu</h1>
            {state ? (
              ""
            ) : (
              <p className="text-red-500 mb-2">Thông tin không chính xác!</p>
            )}
            <p className="my-2 text-sm">
              Chúng tôi {setShowCapcha ? ( <span className="text-red-500" >đã</span> ) : ( <span>sẽ</span> )} gửi mã xác thực đến địa chỉ email của bạn. Vui lòng
              kiểm tra email !{" "}
            </p>
            <form action="" ref={ref} className="" style={{ width: "450px" }}>
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
              <label htmlFor="email" className="font-semibold mb-4">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="mt-2 mb-4 border border-gray-300 py-2 pl-3 w-full rounded-md focus:outline-none"
                placeholder="Email"
              />
              {showCapcha ? (
                <div>
                  <label htmlFor="capcha" className="font-semibold mb-4">
                    Mã xác thực <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="capcha"
                    id="capcha"
                    className="mt-2 mb-4 border border-gray-300 py-2 pl-3 w-full rounded-md focus:outline-none"
                    placeholder="Mã xác thực"
                  />
                  <div>
                    <label htmlFor="password" className="font-semibold mb-4">
                      Mật khẩu mới <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="mt-2 mb-4 border border-gray-300 py-2 pl-3 w-full rounded-md focus:outline-none"
                      placeholder="Mật khẩu mới"
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* { showChangePass ? (  ) : '' } */}
              {(() => {
                if (showCapcha) {
                  return (
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-yellow-500 hover:text-white  uppercase font-semibold tracking-widest text-white p-2 rounded-md w-full mt-4"
                      onClick={handleForgotPass}
                    >
                      Đổi mật khẩu
                    </button>
                  );
                } else {
                  return (
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-yellow-500 hover:text-white  uppercase font-semibold tracking-widest text-white p-2 rounded-md w-full mt-4"
                      onClick={handleGetCapCha}
                    >
                      Lấy capcha
                    </button>
                  );
                }
              })()}
              <button
                type="submit"
                className="hover:bg-yellow-500 text-red-500 border border-red-500 hover:text-white hover:border-none uppercase font-semibold tracking-widest p-2 rounded-md w-full mt-4"
                onClick={handleCancel}
              >
                Hủy
              </button>
            </form>
          </div>
          <div className="w-1/2 bg-red-500 text-white flex items-center">
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
    </div>
  );
}

export default ForgotPass;
