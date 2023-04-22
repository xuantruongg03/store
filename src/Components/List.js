import clsx from "clsx";
import { Link } from "react-router-dom";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./Sass/List.module.scss"

const type = [
    {
      id: 1,
      name: "Máy tính để bàn",
      image: require("../access/image/types/pc.jpg"),
      key: "pc",
    },
    {
      id: 2,
      name: "Máy tính xách tay",
      image: require("../access/image/types/laptop.jpg"),
      key: "laptop",
    },
    {
      id: 3,
      name: "Màn hình máy tính",
      image: require("../access/image/types/mirror.jpg"),
      key: "mirror"
    },
    {
      id: 4,
      name: "Ghế gaming",
      image: require("../access/image/types/ghe.jpg"),
      key: "chair"
    },
    {
      id: 5,
      name: "Phụ kiện",
      image: require("../access/image/types/phukien.jpg"),
      key: "assesories"
    },
    {
      id: 6,
      name: "Thiết bị mạng",
      image: require("../access/image/types/mang.jpg"),
      key: "network"
    },
    {
      id: 7,
      name: "Đặt lịch sữa chữa",
      image: require("../access/image/types/suachua.jpg"),
        key: "repair"
    },
  ];  

function List() {
    return ( 
        <div className={clsx("w-full flex flex-row mt-5 justify-between overflow-hidden", style.list)}>
            <Swiper
                spaceBetween={10}
                slidesPerView={7}
                // onSlideChange={() => console.log("slide change")}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                className="border mt-3"
            >
                {type.map((item, index) => {
                    return (
                        <SwiperSlide
                            key={index}
                            className="border rounded flex justify-center items-center py-1"
                        >
                            <Link to={`/${item.key}`} key={index} className="flex flex-col items-center hover:text-red-500">
                                <img src={item.image} alt="Hình ảnh" className="lg:w-16 sm:w-10 lg:h-16 sm:h-10 rounded-full"/>
                                <p className="text-center md:text-sm">{item.name}</p>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
     );
}

export default List;