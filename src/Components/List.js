import { Link } from "react-router-dom";

const type = [
    {
      id: 1,
      name: "Máy tính để bàn",
      image: require("../access/image/types/pc.jpg"),
      key: "pc",
    },
    {
      id: 2,
      name: "Máy tính xách tay",
      image: require("../access/image/types/laptop.jpg"),
      key: "laptop",
    },
    {
      id: 3,
      name: "Màn hình máy tính",
      image: require("../access/image/types/mirror.jpg"),
      key: "mirror"
    },
    {
      id: 4,
      name: "Ghế gaming",
      image: require("../access/image/types/ghe.jpg"),
      key: "chair"
    },
    {
      id: 5,
      name: "Phụ kiện",
      image: require("../access/image/types/phukien.jpg"),
      key: "assesories"
    },
    {
      id: 6,
      name: "Thiết bị mạng",
      image: require("../access/image/types/mang.jpg"),
      key: "network"
    },
    {
      id: 7,
      name: "Đặt lịch sữa chữa",
      image: require("../access/image/types/suachua.jpg"),
        key: "repair"
    },
  ];  

function List() {
    return ( 
        <div className="w-full overflow-hidden flex flex-row mt-5 justify-between">
            {type.map((item, index) => {
              return (
                <Link to={`/${item.key}`} key={index} className="flex flex-col items-center hover:text-red-500">
                    <img src={item.image} alt="Hình ảnh" className="w-16 h-16 rounded-full"/>
                    <p className="text-center">{item.name}</p>
                </Link>
              )  
            })}
        </div>
     );
}

export default List;