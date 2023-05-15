import clsx from "clsx";
import style from "./Account.module.scss"
import { Link } from "react-router-dom";

function Orders() {
  return (
    <div className="flex bg-slate-100 p-4 justify-around items-center">
      <div className="flex flex-col w-full">
        <h1 className="text-xl font-semibold uppercase border-b border-slate-200">
          Đơn hàng của bạn
        </h1>
        <table className={clsx("mt-3 border-collapse", style.table)}>
            <thead className="font-semibold text-sm bg-orange-500 h-10 text-white border-collapse   ">
                <tr>
                    <th>STT</th>
                    <th>Mã đơn hàng</th>
                    <th>Ngày đặt hàng</th>
                    <th>Trạng thái</th>
                    <th>Tổng tiền</th>
                    <th>Chi tiết</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {/* Gộp hàng trong html */}
                <tr className="border-collapse border-b border-slate-200"></tr>
            </tbody>
            <h1 className="mt-3">Chưa có đơn hàng nào</h1>
        </table>
        <div className={clsx('my-3', style.box_2)}>
                <div className='flex justify-between items-center'>
                    <img src="" alt="Hình ảnh sản phẩm" className={style.img}/>
                    <div className='pl-5 flex flex-col justify-start'>
                        <Link
                            className="text-xs no-underline hover:tex-red-500"
                        >
                            Teen san pham
                        </Link>
                        <div>
                            <label htmlFor="" className={clsx("text-sm", style.label)}>Số lượng: </label>
                            <input className={clsx("w-8 text-sm text-center")} value={1} disabled></input>
                        </div>
                    </div>
                        <p className='font-semibold text-red-500'>10.000.000 VND</p>
                </div>
            </div>
      </div>
    </div>
  );
}

export default Orders;
