import { faGift, faHeart, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import formatsMoney from "../../Convert/ConvertMoneyVND";
import { addToCart } from "../../api/cart";
import style from './Detail.module.scss'
import clsx from "clsx";
import { addLikeProduct } from "../../api/products";

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
                    if (response.newToken != null) {
                        localStorage.setItem('token', response.newToken);
                    }
                    if (response.refreshToken != null) {
                        localStorage.setItem('refresh_token', response.refreshToken);
                    }
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
        navigate('/cart');
    }

    const like = (e) => {
        e.preventDefault();
        if(stateLogin) {
            const product_id = props.id;
            const fetch = async () => {
                const res = await addLikeProduct({product_id: product_id});
                if(res.message === "ok") {
                    if (res.newToken != null) {
                        localStorage.setItem('token', res.newToken);
                    }
                    if (res.refreshToken != null) {
                        localStorage.setItem('refresh_token', res.refreshToken);
                    }
                    alert('Đã thêm vào danh sách yêu thích');
                } else {
                    alert("Có lỗi! Vui lòng thử lại.")
                }
            }
            fetch();
        } else {
            navigate('/login');
        }
    }

    return ( 
        <div className={clsx("flex flex-col sm:mt-5 sm:w-full md:ml-5 text-sm", style.box_2)} style={{minWidth: '400px'}}>
            <h1 className={clsx("font-bold text-lg", style.title)}>{props.title}</h1>
            <div className="flex my-2">
                <label className="text-sm">Thương hiệu: <span className="font-bold">Apple</span></label>
            </div>
            <label htmlFor="" className="text-red-500 text-2xl font-bold my-2">{formatsMoney(props.price)}</label>
            {props.sale > 0 ? (<label htmlFor="" className="text-gray-500 text-lg line-through my-2">{formatsMoney(props.cost)}</label>) : ''}
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
            <div className="my-2 flex items-center">
                <button onClick={handleQuantitySub} className=" px-3 border text-lg hover:bg-red-500 hover:text-white">-</button>
                <input type="number" className="w-16 text-center border py-1 focus:outline-none" value={quantity} min="1" max={props.quantity} />
                <button onClick={handleQuantityAdd} className=" px-3 border text-lg hover:bg-red-500 hover:text-white">+</button>
            </div>
            <div className="my-2">
                <button 
                    className={clsx("bg-red-500 sm:my-2  text-white py-1 px-10 rounded border uppercase mr-2 hover:bg-white hover:text-red-500 hover:border hover:border-red-500", style.btnadd)} 
                    onClick={handleAddToCart}>Thêm vào giỏ hàng <br /> <span className="text-sm normal-case">Cam kết chính hãng/đổi trả 24h</span> </button>
                <button 
                    className={clsx(" sm:my-2 uppercase text-center bg-green-500 text-white rounded border py-1 px-8 hover:border hover:border-orange-500 hover:text-orange-500 hover:bg-white", style.btnbuy)} 
                    onClick={handleBuyNow}>Mua ngay <br /> <span className="text-sm normal-case">Thanh toán nhanh chóng</span> </button>
            </div>
            <div className="my-2 flex items-center">
                <label 
                    className="py-2 px-4 text-white bg-yellow-500 rounded-lg">
                        Gọi <span className="font-bold hover:text-red-500 hover:cursor-text">0981793201</span> để được tư vấn mua hàng
                </label>
                {/* <button onClick={like} className="bg-yellow-500 py-2 px-3 rounded-xl mx-5 hover:opacity-70"> {loadingButton ? <span class='loader-button'></span> : <FontAwesomeIcon icon={faHeart} className='text-white'/>}</button> */}
                <button onClick={like} className="bg-yellow-500 py-2 px-3 rounded-xl mx-5 hover:opacity-70"> <FontAwesomeIcon icon={faHeart} className="text-white"/> </button>
                <button className="bg-yellow-500 py-2 px-3 rounded-xl  hover:opacity-70"> <FontAwesomeIcon icon={faRandom} className="text-white"/> </button>
            </div>
        </div>
     );
}

export default InfoDetail;