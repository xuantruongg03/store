import { faCertificate, faReceipt, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Link } from "react-router-dom";
import style from "./Detail.module.scss"
import { useEffect, useState } from "react";
import { getAllBlog } from "../../api/blog";
import NewsItemVer from "../../Components/NewsItemVer";

function MoreInfo(props) {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllBlog();
            setBlog(res.data);
            if(res.newToken) {
                localStorage.setItem('token', res.newToken);
            }
            if(res.refreshToken) {
                localStorage.setItem('refresh_token', res.refreshToken);
            }
        }
        fetch();
    }, [])

    return ( 
        <div className={clsx("md:hidden lg:block w-80 ml-5", style.boxMore)}>
            <div className={clsx("flex flex-col bg-gray-100 py-2 px-5", style.box_4)}>
                <h1 className="text-lg">Thông tin hữu ích</h1>
                <Link to={'/repair'} className="my-2 border-b-2"> <FontAwesomeIcon icon={faScrewdriverWrench}/> <span className="ml-3">Sữa chữa tại nhà</span></Link>
                <Link to={'/repair'} className="my-2 border-b-2"> <FontAwesomeIcon icon={faCertificate}/> <span className="ml-3">Chính sách bảo hành</span></Link>
                <Link to={'/repair'} className="my-2 border-b-2"> <FontAwesomeIcon icon={faReceipt}/> <span className="ml-3">Hướng dẫn thanh toán</span></Link>
                    <h1 className="my-2">Chat với chúng tôi</h1>
                <div className="flex justify-between items-center">
                    <a href="https://m.me/xuan.truong.03" target="_blank" rel="noreferrer" className="flex hover:cursor-pointer">
                        <img src={require("../../access/image/messenger.png")} alt="Messenger" className="h-6 w-6 hover:opacity-80"/> 
                        <span className="ml hover:opacity-80 font-bold text-red-500">Messenger</span> 
                    </a>
                    <a href="https://zalo.me/0981793201" className="flex hover:cursor-pointer">
                        <img src={require("../../access/image/zalo.jpg")} alt="Zalo" className="h-6 w-6 hover:opacity-80"/> 
                        <span className="ml-1 hover:opacity-80 font-bold text-red-500">Zalo</span> 
                    </a>
                </div>
            </div>
            <div className="mt-5">
                <h1 className="text-xl font-bold">Tin tức công nghệ</h1>
                <div className="flex flex-col">
                    {blog.slice(0, 3).map((item, index) => (
                        <NewsItemVer key={index} data={item} />
                    ))}
                </div>
            </div>
        </div>
     );
}

export default MoreInfo;