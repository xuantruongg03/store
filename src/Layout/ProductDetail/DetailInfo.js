import clsx from "clsx";
import style from "./Detail.module.scss"
import { useState } from "react";

function DetailInfo(props) {
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }

    return ( 
        <div className={clsx("md:w-96 sm:mb-5 md:mb-0 sm:w-full text-sm", style.box_3)}>
            <div className={clsx("text-2xl font-bold my-5", style.titleInf)}>Thông tin sản phẩm</div>
            <div className="grid grid-cols-1">
                {show ? 
                    props.details.map((item, index) => {
                        return (
                            <div key={index} className="flex border text-sm items-center">
                                <div className="font-bold w-28 px-1 py-5 text-center border-r">{item.detail_name}</div>
                                <div className="ml-2 py-5 w-60">{item.detail_value}</div>
                            </div>
                        )
                    })
                : 
                    props.details.slice(0, 4).map((item, index) => {
                        return (
                            <div key={index} className="flex border text-sm items-center">
                                <div className="font-bold w-28 px-1 py-5 text-center border-r">{item.detail_name}</div>
                                <div className="ml-2 py-5 w-60">{item.detail_value}</div>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={handleShow} className="mt-3 py-2 px-5 border border-red-500 text-red-500 w-full rounded hover:bg-red-500 hover:text-white">{show ? "Rút gọn" : "Xem cấu hình chi tiết"}</button>
        </div>
     );
}

export default DetailInfo;