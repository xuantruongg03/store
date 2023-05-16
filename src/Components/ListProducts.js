import { useEffect, useState } from "react";
import { getAllProducts } from "../api/products";
import ListProductsChild from "./ListProductsChild";
import ListNews from "./ListNews";
import { getAllBlog } from "../api/blog";

function ListProducts() {
  const [computer, setComputer] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [sale, setSale] = useState([]);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await getAllProducts();
      const fetchData = await getAllBlog();
      if (res.message === "ok") {
          setNews(fetchData);
        setLoading(false);
        if (res.newToken != null) {
          localStorage.setItem("token", res.newToken);
        }
        if (res.refreshToken != null) {
          localStorage.setItem("refresh_token", res.refreshToken);
        }
        let computerData = res.data.filter(
          (element) => element.product_type.toLowerCase() === "laptop"
        );
        setComputer(computerData);
        let accessoriesData = res.data.filter(
          (element) => element.product_type.toLowerCase() === "accessory"
        );
        setAccessories(accessoriesData);
        let saleData = res.data.filter(
          (element) => element.product_sale_price > 0
        );
        setSale(saleData);
      } else if (res.status === 404) {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="box-loader">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="my-8">
      <ListProductsChild
        list={sale}
        title="Khuyến mãi"
        word="sale"
        image_banner="https://bizweb.dktcdn.net/100/429/689/themes/869367/assets/banner_1.jpg?1677379323227"
      />
      <ListProductsChild
        list={computer}
        title="Máy tính xách tay"
        word="Laptop"
        image_banner="https://bizweb.dktcdn.net/100/429/689/themes/869367/assets/banner_1.jpg?1677379323227"
      />
      <ListProductsChild
        list={accessories}
        title="Phụ kiện máy tính"
        word="accessory"
        image_banner="https://bizweb.dktcdn.net/100/429/689/themes/869367/assets/banner_1.jpg?1677379323227"
      />
    <ListNews
        list={news}
    />
    </div>
  );
}

export default ListProducts;
