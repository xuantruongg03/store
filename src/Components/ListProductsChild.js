import Product from "./Product";
function ListProductsChild(props) {
  return (
    <div className="my-8">
      <div className="border-b border-red-500">
        <div className="p-3 bg-red-500 border rounded-lg w-56">
          <h1 className="font-bold text-lg text-center text-white tracking-wider">
            {props.title}
          </h1>
        </div>
      </div>
      <div className="mt-3 flex flex-row justify-between ">
        <img
          src={`${props.image_banner}`}
          alt="Banner colums"
          className="w-60"
          style={{ height: "800px" }}
        />
        <div className="flex flex-wrap ml-2">
          {props.list.map((element) => {
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
      </div>
    </div>
  );
}

export default ListProductsChild;
