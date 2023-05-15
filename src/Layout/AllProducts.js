import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByType, getProductsSale } from "../api/products";
import Product from "../Components/Product";
import clsx from "clsx";
import ProductMobile from "../Components/ProductMobile";

function AllProducts() {
  const { type } = useParams();
  const [data, setData] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(12);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (type === "sale") {
      const fetchData = async () => {
        const res = await getProductsSale();
        // console.log(res.data);
        setData(res.data);
        setLoading(false);
        setTotalPage(Math.ceil(res.data.length / 12));
      };
      fetchData();
    } else {
      const fetchData = async () => {
        const res = await getProductsByType(type);
        setData(res.data);
        setLoading(false);
        setTotalPage(Math.ceil(res.data.length / 12));
      };
      fetchData();
    }
  }, [type]);

  const handlePage = (page) => {
    setCurrentPage(page);
    setPageStart((page - 1) * 12);
    setPageEnd(page * 12);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hanldeSort = (e) => {
    setSort(e.target.name);
    if (sort === "name") {
      const sortData = data.sort((a, b) => {
        const nameA = a.product_name.toLowerCase();
        const nameB = b.product_name.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      setData(sortData);
    } else if (sort === "price-esc") {
      const sortData = data.sort((a, b) => {
        return b.product_price - a.product_price;
      });
      setData(sortData);
    } else if (sort === "price-desc") {
      const sortData = data.sort((a, b) => {
        return a.product_price - b.product_price;
      });
      setData(sortData);
    } else if (sort === "new") {
    } else if (sort === "view") {
    }
  };

  if(loading) {
    return <div className='box-loader'><span className="loader"></span></div>;
  }

  return (
    <div className="container-custom ">
      <h1 className="text-center my-5 font-semibold text-red-500 sm:text-3xl">
        Sản phẩm khuyến mãi
      </h1>
      <div className="flex flex-wrap ">
        <button
          name="name"
          className="m-1 px-1 bg-red-500 text-white py-1 hover:bg-yellow-400 mx-1 text-sm"
          onClick={hanldeSort}
        >
          Tên A-Z
        </button>
        <button
          name="price-esc"
          className="m-1 px-1 bg-red-500 text-white py-1 hover:bg-yellow-400 mx-1 text-sm"
          onClick={hanldeSort}
        >
          Giá thấp đến cao
        </button>
        <button
          name="price-desc"
          className="m-1 px-1 bg-red-500 text-white py-1 hover:bg-yellow-400 mx-1 text-sm"
          onClick={hanldeSort}
        >
          Giá cao xuống thấp
        </button>
        <button className="m-1 px-1 bg-red-500 text-white py-1 hover:bg-yellow-400 mx-1 text-sm">
          Mới nhất
        </button>
        <button className="m-1 px-1 bg-red-500 text-white py-1 hover:bg-yellow-400 mx-1 text-sm">
          Xem nhiều nhất
        </button>
      </div>
      <div className="my-5 grid grid-cols-2 sm:grid-cols-4 gap-2 justify-between">
        {(() => {
          if (data.length > 0) {
            const result = [];
            for (let i = pageStart; i < pageEnd; i++) {
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
                  />
                  )
                }
              }
            }
            return result;
          } else {
            return (
              <p className="text-center text-red-500">Không có sản phẩm nào</p>
            );
          }
        })()}
      </div>
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
                    currentPage === i ? "bg-yellow-400" : "bg-red-500"
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

export default AllProducts;
