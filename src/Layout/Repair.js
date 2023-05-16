import clsx from "clsx";
import { useRef } from "react";
import style from "../Components/Sass/Login.module.scss";
import bookingApi from "../api/booking";

function Repair() {
    const ref = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        let date = new Date();
        const submit = async () => {
            const data = {
                phone: ref.current.phone.value,
                address: ref.current.address.value,
                repair_date: `Ngày: ${date.toLocaleDateString()} - Giờ: ${date.toLocaleTimeString()}`,
                problem: ref.current.problem.value,
            }
            const fetch = await bookingApi(data);
            if (fetch.message === "ok") {
                alert("Đặt lịch thành công!");
                ref.current.reset();
                if (fetch.newToken != null) {
                    localStorage.setItem('token', fetch.newToken);
                  }
                  if (fetch.refreshToken != null) {
                    localStorage.setItem('refresh_token', fetch.refreshToken);
                  }
                window.location.href = "/";
            } else {
                alert("Đặt lịch thất bại!");
            }
        }
        submit();
    }

    return ( 
        <div className={clsx("flex justify-center items-center my-10 sm:mx-20", style.container)}>
      <div className={clsx("flex border border-red-500", style.box)}>
        <div className="p-5 sm:w-2/3">
          <h1 className="font-semibold text-lg mb-3">Đặt lịch sửa chữa</h1>
          <form action="" ref={ref}>
            <label htmlFor="phone" className="font-semibold mb-4">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="mt-2 mb-4 border border-gray-300 py-2 pl-3 w-full rounded-md focus:outline-none"
              placeholder="Số điện thoại"
            />
            <label htmlFor="address" className="font-semibold mt-3">
              Địa chỉ <span className="text-red-500">*</span>
            </label>
            <input
              type="tex"
              name="address"
              id="address"
              className="mt-2 mb-4 border border-gray-300 py-2 pl-3 w-full rounded-md focus:outline-none"
              placeholder="Địa chỉ sửa chữa"
            />
            <label htmlFor="problem" className="font-semibold mt-3">
                Vấn đề
            </label>
            <textarea
                type="text"
                name="problem"
                id="problem"
                className="mt-2 mb-4 border border-gray-300 py-2 pl-3 w-full resize-none h-40 rounded-md focus:outline-none"
                placeholder="Vui lòng nêu vấn đề cần sửa chữa"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-yellow-400 uppercase font-semibold tracking-widest text-white p-2 rounded-md w-full mt-4"
                onClick={handleSubmit}
            >
              Đăng nhập
            </button>
          </form>
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
              <li className="my-2">Sửa chữa tại nhà</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
     );
}

export default Repair;