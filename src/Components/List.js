import clsx from "clsx";
import { Link } from "react-router-dom";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./Sass/List.module.scss"
import list from "../listType";

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
                {list.map((item, index) => {
                    return (
                        <SwiperSlide
                            key={index}
                            className="border rounded flex justify-center items-center py-1"
                        >
                            <Link to={item.key !== 'repair' ? `/product/type/${item.key}` : '/repair'} key={index} className="flex flex-col items-center hover:text-red-500">
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