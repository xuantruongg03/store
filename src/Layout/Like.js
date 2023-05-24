import { useEffect, useState } from "react";
import { getLikeProduct } from "../api/products";
import Product from "../Components/Product";
import ProductMobile from "../Components/ProductMobile";
import clsx from "clsx";

function Like() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(12);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await getLikeProduct();
      setLoading(false);
      if (res.message === "ok") {
        setData(res.data);
        setTotalPage(Math.ceil(res.data.length / 12));
        if (res.newToken != null) {
          localStorage.setItem("token", res.newToken);
        }
        if (res.refreshToken != null) {
          localStorage.setItem("refresh_token", res.refreshToken);
        }
      }
    };
    fetch();
  }, []);

  const handlePage = (page) => {
    setPage(page);
    setStartPage((page - 1) * 12);
    setEndPage(page * 12);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="box-loader">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="mx-5 sm:mx-36 my-5">
      <h1 className="text-xl sm:text-3xl text-red-500 font-semibold text-center my-5">
        Sản phẩm yêu thích
      </h1>
      {data.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {(() => {
            if (data.length > 0) {
              const result = [];
              for (let i = startPage; i < endPage; i++) {
                if (data[i]) {
                  if (window.innerWidth > 480) {
                    result.push(
                      <Product
                        key={data[i].product_id}
                        productID={data[i].product_id}
                        sale={data[i].product_sale_price}
                        img={data[i].product_images[0]}
                        name={data[i].product_name}
                        price={data[i].product_price}
                        stateLike={true}
                      />
                    );
                  } else {
                    result.push(
                      <ProductMobile
                        key={data[i].product_id}
                        productID={data[i].product_id}
                        sale={data[i].product_sale_price}
                        img={data[i].product_images[0]}
                        name={data[i].product_name}
                        price={data[i].product_price}
                        stateLike={true}
                      />
                    );
                  }
                }
              }
              return result;
            }  else {
                return (
                  <p className="text-center text-red-500">Không có sản phẩm nào</p>
                );
              }
          })()}
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-center items-center mx-5 mb-3">
        {(() => {
          if (data.length > 0 && totalPage > 1) {
            const result = [];
            for (let i = 1; i <= totalPage; i++) {
              const handleClick = () => {
                handlePage(i);
              };
              result.push(
                <button
                  className={clsx(
                    "my-1 px-1 text-white py-1 hover:bg-yellow-400 mx-2 text-sm",
                    page === i ? "bg-yellow-400" : "bg-red-500"
                  )}
                  onClick={handleClick}
                >
                  {i}
                </button>
              );
            }
            return result;
          }
        })()}
      </div>
    </div>
  );
}

export default Like;
