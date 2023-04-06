import { faCertificate, faReceipt, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function MoreInfo(props) {
    return ( 
        <div>
            <div className="flex flex-col bg-gray-100 py-2 px-5">
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
                    <div className="flex justify-between items-center my-3">
                        <img src="https://bizweb.dktcdn.net/thumb/medium/100/429/689/articles/apple-ihome-concept-1.jpg?v=1623602544500" alt="Tin tức-1" className="h-16 w-16"/>
                        <h1 className="w-40">Hàng loạt thiết bị mới của Apple bị cháy hàng ở Việt Nam</h1>
                    </div>
                    <div className="flex justify-between items-center my-3">
                        <img src="https://bizweb.dktcdn.net/thumb/medium/100/429/689/articles/apple-ihome-concept-1.jpg?v=1623602544500" alt="Tin tức-1" className="h-16 w-16"/>
                        <h1 className="w-40">Hàng loạt thiết bị mới của Apple bị cháy hàng ở Việt Nam</h1>
                    </div>
                    <div className="flex justify-between items-center my-3">
                        <img src="https://bizweb.dktcdn.net/thumb/medium/100/429/689/articles/apple-ihome-concept-1.jpg?v=1623602544500" alt="Tin tức-1" className="h-16 w-16"/>
                        <h1 className="w-40">Hàng loạt thiết bị mới của Apple bị cháy hàng ở Việt Nam</h1>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default MoreInfo;