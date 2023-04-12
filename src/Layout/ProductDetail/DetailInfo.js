
function DetailInfo(props) {

    const handleShow = () => {

    }

    return ( 
        <div className="md:w-96 sm:mb-5 md:mb-0 sm:w-full">
            <div className="text-2xl font-bold my-5">Thông tin sản phẩm</div>
            <div className="grid grid-cols-1">
                {props.details.splice(0, 4).map((item, index) => {
                    return (
                        <div key={index} className="flex border text-sm items-center">
                            <div className="font-bold w-28 px-1 py-5 text-center border-r">{item.detail_name}</div>
                            <div className="ml-2 py-5 w-60">{item.detail_value}</div>
                        </div>
                    )
                })}
            </div>
            <button onClick={handleShow} className="mt-3 py-2 px-5 border border-red-500 text-red-500 w-full rounded hover:bg-red-500 hover:text-white">Xem cấu hình chi tiết</button>
        </div>
     );
}

export default DetailInfo;