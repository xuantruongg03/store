import { Link } from "react-router-dom";
import Product from "./Product";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import style from './Sass/ListProductsChild.module.scss'
import clsx from "clsx";

function ListProductsChild(props) {
  return (
    <div className="my-8">
      <div className="border-b border-red-500 flex flex-row justify-between items-end">
        <div className="p-3 bg-red-500 border rounded-lg lg:w-56 md:w-40">
          <h1 className="font-bold lg:text-lg md:text-base text-center text-white tracking-wider">
            {props.title}
          </h1>
        </div>
      <Link to={`/${props.word}`} className="text-red-500 hover:text-yellow-500 hover:underline ">Xem tất cả &gt;&gt; </Link>
      </div>
      <div className="mt-3 flex flex-row justify-between ">
        <img
          src={`${props.image_banner}`}
          alt="Banner colums"
          className={clsx("w-60 h-auto sm:hidden lg:block", style.banner)}
        />
        <div className={clsx("flex flex-wrap ml-2", style.banner)}>
          {props.list.splice(0, 8).map((element) => {
            return (
              <Product
                key={element.product_id}
                productID={element.product_id}
                sale={element.product_sale_price}
                img={element.product_images[0]}
                name={element.product_name}
                price={element.product_price}
              />
            );
          })}
        </div>
         
        <Swiper
                spaceBetween={5}
                slidesPerView={1}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                pagination={{ clickable: true }}
                className={clsx("sm:hidden", style.swiper)}
            >
                {props.list.map((element) => {
                    return (
                        <SwiperSlide key={element.product_id} className={clsx("sm:hidden", style.swiper)}>
                            <Product
                                 key={element.product_id}
                                 productID={element.product_id}
                                 sale={element.product_sale_price}
                                 img={element.product_images[0]}
                                 name={element.product_name}
                                 price={element.product_price}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            
      </div>
    </div>
  );
}

export default ListProductsChild;
