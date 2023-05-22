import { Link } from "react-router-dom";
import Product from "./Product";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import style from './Sass/ListProductsChild.module.scss'
import clsx from "clsx";
import ProductMobile from "./ProductMobile";

function ListProductsChild(props) {

  return (
    <div className="my-8">
      <div className="border-b border-red-500 flex flex-row justify-between items-end">
        <div className="p-2 bg-red-500 border rounded-lg lg:w-44 md:w-40 ">
          <h1 className="font-bold md:text-base text-center text-white tracking-wider">
            {props.title}
          </h1>
        </div>
      <Link to={`/product/type/${props.word}`} className="text-red-500 hover:text-yellow-500 hover:underline ">Xem tất cả &gt;&gt; </Link>
      </div>
      <div className="mt-3 flex flex-row justify-between ">
        <img
          src={`${props.image_banner}`}
          alt="Banner colums"
          className={clsx("w-44 h-auto sm:hidden lg:block", style.banner)}
        />
        <div className={clsx("grid grid-cols-4 gap-1", style.banner)}>
          {props.list.slice(0, 8).map((element) => {
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
                slidesPerView={2}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                // pagination={{ clickable: true }}
                className={clsx("sm:hidden", style.swiper)}
            >
                {props.list.map((element) => {
                    return (
                        <SwiperSlide key={element.product_id}>
                            <ProductMobile
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
