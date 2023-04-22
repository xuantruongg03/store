import clsx from "clsx";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./Detail.module.scss"

function DetailImage(props) {
    return ( 
        <div className={clsx("sm:w-full lg:w-96", style.boxImage)}>
            <img src={props.img} alt="Hình ảnh sản phẩm" className={clsx("h-96 w-full", style.image)} />
            <Swiper
                spaceBetween={10}
                slidesPerView={3}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                className="border mt-3 sm:w-full"
            >
            {props.allImages.map((item, index) => {
                return (
                <SwiperSlide
                    key={index}
                    className={clsx(
                    "border rounded w-16 h-16",
                    index === props.check ? "border-red-500" : "",
                   
                    )}
                >
                    <img
                    className={clsx("w-24 h-16 ml-3 sm:w-full sm:px-10", style.boxchildimage)}
                    key={index}
                    src={item.file_path}
                    alt="Hình ảnh sản phẩm"
                    onClick={() => {
                        props.setImg(item.file_path);
                        props.setCheck(index);
                    }}
                    />
                </SwiperSlide>
                );
            })}
            </Swiper>
      </div>
     );
}

export default DetailImage;