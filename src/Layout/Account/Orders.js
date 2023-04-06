
function Orders() {
  return (
    <div className="flex bg-slate-100 p-4 justify-around items-center">
      <div className="flex flex-col w-full">
        <h1 className="text-xl font-semibold uppercase border-b border-slate-200">
          Đơn hàng của bạn
        </h1>
        <table className="mt-3 border-collapse">
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
      </div>
    </div>
  );
}

export default Orders;
