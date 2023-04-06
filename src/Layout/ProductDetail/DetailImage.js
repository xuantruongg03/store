import clsx from "clsx";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function DetailImage(props) {
    return ( 
        <div className="w-96 ">
        <img src={props.img} alt="Hình ảnh sản phẩm" className="h-96 w-full" />
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          className="border mt-3"
        >
          {props.allImages.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className={clsx(
                  "border rounded w-16 h-16 flex justify-center items-center",
                  index === props.check ? "border-red-500" : ""
                )}
              >
                <img
                className="w-24 h-16 ml-3"
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
        
        {/* Thông tin sản phẩm */}
        <div></div>
      </div>
     );
}

export default DetailImage;