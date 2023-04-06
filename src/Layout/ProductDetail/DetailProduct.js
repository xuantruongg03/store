import { faGift, faHeart, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import formatsMoney from "../../Convert/ConvertMoneyVND";
import { addToCart } from "../../api/cart";
import clsx from "clsx";

function InfoDetail(props) {
    const navigate = useNavigate();
    const state = useSelector((state) => state.login);
    const stateLogin = state !== null ? state.state : false;
    const [quantity, setQuantity] = useState(1);
    const [config, setConfig] = useState(256);

    const handleQuantityAdd = (e) => {
        setQuantity(quantity + 1);
    }

    const handleQuantitySub = (e) => {
        if (quantity < 1) {
            setQuantity(1);
            alert('Số lượng không được nhỏ hơn 1');
        } else {
            setQuantity(quantity - 1);
        }
    }

    const handleAddToCart = (e) => {
        e.preventDefault();
        if(stateLogin) {
            const add = async () => {
                const params = {
                    customer_id: localStorage.getItem('customer_id'),
                    product_id: props.id,
                    quantity: quantity,
                }
                const response = await addToCart(params);
                if(response.message === "ok") {
                    alert('Thêm vào giỏ hàng thành công');
                } else {
                    alert('Thêm vào giỏ hàng thất bại');
                }
            }
            add();
        } else {
            navigate('/login');
        }
    }
    
    const handleBuyNow = (e) => {
        e.preventDefault();
        handleAddToCart(e);
        navigate('/pay');
    }

    return ( 
        <div className="flex flex-col" style={{minWidth: '400px'}}>
            <h1 className="font-bold text-lg">{props.title}</h1>
            <div className="flex my-2">
                <label className="text-sm">Thương hiệu: <span className="font-bold">Apple</span></label>
            </div>
            <label htmlFor="" className="text-red-500 text-2xl font-bold my-2">{formatsMoney(props.price)}</label>
            <label htmlFor="" className="text-gray-500 text-lg line-through my-2">{formatsMoney(props.cost)}</label>
            <div className="bg-gray-100 w-full p-3 rounded my-2">
                <div className="py-1 px-3 bg-red-500 w-48 rounded-xl my-3">
                    <label htmlFor="" className="uppercase text-sm text-white font-semibold"> <FontAwesomeIcon icon={faGift}/> Khuyến mãi - ưu đãi</label>
                </div>
                <ul className="list-disc list-inside">
                        <li className="text-sm my-1 marker:text-green-500 marker:text-base">Tặng tai nghe Airpod 3 chính hãng</li>
                        <li className="text-sm my-1 marker:text-green-500 marker:text-base">Tặng thêm 1 năm bảo hành miễn phí</li>
                        <li className="text-sm my-1 marker:text-green-500 marker:text-base">Giảm thêm 10% khi thanh toán bằng thẻ tín dụng</li>
                        <li className="text-sm my-1 marker:text-green-500 marker:text-base">Giảm thêm khi mua kèm phụ kiện</li>
                    </ul>
            </div>
            <label className="my-2">Bộ nhớ: <span className="text-red-500 font-semibold my-2">{config}GB</span></label>
            <div className="w-32 flex justify-between items-center my-2">
                <button onClick={() => {setConfig(256)}} className={clsx("border p-1 rounded-xl", config === 256 ? 'border-red-500 text-red-500' : '')}>256GB</button>
                <button onClick={() => {setConfig(512)}} className={clsx("border p-1 rounded-xl", config === 512 ? 'border-red-500 text-red-500' : '')}>512GB</button>
            </div>
            <div className="my-2">
                <label onClick={handleQuantitySub} className="py-1 px-3 border text-lg hover:bg-red-500 hover:text-white disable-select">-</label>
                <input type="number" className="w-16 text-center border py-1 focus:outline-none" value={quantity} min="1" max={props.quantity} />
                <label onClick={handleQuantityAdd} className="py-1 px-3 border text-lg hover:bg-red-500 hover:text-white disable-select">+</label>
            </div>
            <div className="my-2">
                <button 
                    className="bg-red-500 text-white py-1 px-10 rounded border uppercase mr-2 hover:bg-white hover:text-red-500 hover:border hover:border-red-500" 
                    onClick={handleAddToCart}>Thêm vào giỏ hàng <br /> <span className="text-sm normal-case">Cam kết chính hãng/đổi trả 24h</span> </button>
                <button 
                    className="uppercase text-center bg-green-500 text-white rounded border py-1 px-8 hover:border hover:border-orange-500 hover:text-orange-500 hover:bg-white" 
                    onClick={handleBuyNow}>Mua ngay <br /> <span className="text-sm normal-case">Thanh toán nhanh chóng</span> </button>
            </div>
            <div className="my-2 flex items-center">
                <label 
                    className="py-2 px-4 text-white bg-yellow-500 rounded-lg">
                        Gọi <span className="font-bold hover:text-red-500 hover:cursor-text">0981793201</span> để được tư vấn mua hàng
                </label>
                <button className="bg-yellow-500 py-2 px-3 rounded-xl mx-5 hover:opacity-70"> <FontAwesomeIcon icon={faHeart} className="text-white"/> </button>
                <button className="bg-yellow-500 py-2 px-3 rounded-xl  hover:opacity-70"> <FontAwesomeIcon icon={faRandom} className="text-white"/> </button>
            </div>
        </div>
     );
}

export default InfoDetail;