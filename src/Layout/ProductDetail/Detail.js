import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "../../Components/Product";
import ProductMobile from "../../Components/ProductMobile";
import { getProductById, getProductsByType } from "../../api/products";
import DetailDes from "./DetailDes";
import DetailImage from "./DetailImage";
import DetailInfo from "./DetailInfo";
import InfoDetail from "./DetailProduct";
import MoreInfo from "./MoreInfo";
import "swiper/swiper-bundle.css";
import clsx from "clsx";
import style from "./Detail.module.scss";

function Detail() {
  const [title, setTitle] = useState();
  const [cost, setCost] = useState();
  const [img, setImg] = useState();
  const [allImages, setAllImages] = useState([]);
  const [price, setPrice] = useState();
  const [sale, setSale] = useState();
  const [description, setDescription] = useState();
  const [details, setDetails] = useState([]);
  const [quantity, setQuatity] = useState();
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("laptop");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [check, setCheck] = useState(0);
  const id = query.get("search");
  useEffect(() => {
    window.scrollTo(0, 0);
    const getInf = async () => {
      const { data } = await getProductById(id);
      setTitle(data[0].product_name);
      setPrice(
        data[0].product_price -
          (data[0].product_sale_price / 100) * data[0].product_price
      );
      setSale(Number(data[0].product_sale_price).toFixed());
      setCost(data[0].product_price);
      setDescription(data[0].product_description);
      setImg(data[0].product_images[0].file_path);
      setAllImages(data[0].product_images);
      setDetails(data[0].product_details);
      setQuatity(data[0].product_quantity);
      setType(data[0].product_type);
      setLoading(false);
    };
    getInf();
    const getProducts = async () => {
      const response = await getProductsByType(type);
       setProducts(response.data);
    };
    getProducts();
  }, [id, type]);

  if (loading) {
    return (
      <div className="box-loader">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <div className={clsx("container-custom sm:mx-10 sm:items-center lg:px-24", style.container)}>
      <div className="lg:flex justify-between my-8 sm:block">
        <div className={clsx("sm:w-3/4 justify-between", style.detailsbox)}>
          <div className={clsx("flex lg:flex-row my-5 justify-between sm:flex-col", style.box1)}>
            <DetailImage
              setCheck={setCheck}
              img={img}
              allImages={allImages}
              check={check}
              setImg={setImg}
            />
            <InfoDetail
              price={price}
              cost={cost}
              title={title}
              sale={sale}
              quantity={quantity}
              id={id}
            />
          </div>
          <div className={clsx("flex my-8 items-center sm:flex-col md:flex-row", style.boxInf)}>
            <DetailInfo details={details} />
            <iframe
              className={clsx("md:ml-5 ms:mt-5", style.video)}
              width="560"
              height="315"
              src="https://www.youtube.com/embed/A99m4HaPpmI?start=2"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <DetailDes description={description} />
        </div>
        <MoreInfo />
      </div>
      <div>
        <div className="border-b border-red-500 my-4">
            <h1 className=" py-2 px-4 bg-red-500 w-48 text-center rounded-md font-bold text-white">Sản phẩm liên quan</h1>
        </div>
        {
            window.innerWidth < 500 ? (
                <div className="grid grid-cols-2 gap-2">
                {products.slice(0,2).map((item, index) => (
                    <ProductMobile
                        key={item.product_id}
                        productID={item.product_id}
                        sale={item.product_sale_price}
                        img={item.product_images[0]}
                        name={item.product_name}
                        price={item.product_price}
                    />
                ))}
                </div>
            ) : (
                <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={4}
        >
            {products.map((item, index) => {
                if (item.product_id !== id) {
                    return (
                        <SwiperSlide>
                            <Product
                                className="w-1/3"
                                key={item.product_id}
                                productID={item.product_id}
                                sale={item.product_sale_price}
                                img={item.product_images[0]}
                                name={item.product_name}
                                price={item.product_price}
                            />
                        </SwiperSlide>
                    );
                }
                return null;
            })}
        </Swiper>
            )
        }
      </div>
    </div>
  );
}

export default Detail;
