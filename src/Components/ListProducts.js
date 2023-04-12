import { useEffect, useState } from "react";
import { getAllProducts } from "../api/products";
import ListProductsChild from "./ListProductsChild";

function ListProducts() {
  const [computer, setComputer] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [sale, setSale] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await getAllProducts();
      let computerData = response.data.filter(
        (element) => element.product_type.toLowerCase() === "laptop"
      );
      setComputer(computerData);
      let accessoriesData = response.data.filter(
        (element) => element.product_type.toLowerCase() === "accessory"
      );
      setAccessories(accessoriesData);
      let saleData = response.data.filter(
        (element) => element.product_sale_price > 0
      );
      setSale(saleData);
    };
    getProducts();
  }, []);
  return (
    <div className="my-8">
      <ListProductsChild list={sale} title="Khuyến mãi" image_banner="https://bizweb.dktcdn.net/100/429/689/themes/869367/assets/banner_1.jpg?1677379323227"/>
      <ListProductsChild list={computer} title="Máy tính xách tay" image_banner="https://bizweb.dktcdn.net/100/429/689/themes/869367/assets/banner_1.jpg?1677379323227"/>
      <ListProductsChild list={accessories} title="Phụ kiện máy tính" image_banner="https://bizweb.dktcdn.net/100/429/689/themes/869367/assets/banner_1.jpg?1677379323227"/>
    </div>
  );
}

export default ListProducts;