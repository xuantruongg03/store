import clsx from "clsx";
import { useState } from "react";
import style from "./Detail.module.scss"

function DetailDes(props) {
    const [content, setContent] = useState(1);

    return ( 
        <div className={style.boxDes}>
            <div>
                <button onClick={() => setContent(1)} className={clsx("py-2 px-3 bg-red-500 text-white font-bold", content === 1 ? 'bg-yellow-500' : '')}>Giới thiệu</button>
                <button onClick={() => setContent(2)} className={clsx("py-2 px-3 bg-red-500 text-white font-bold ml-1", content === 2 ? 'bg-yellow-500' : '')}>Hướng dẫn</button>
                <button onClick={() => setContent(3)} className={clsx("py-2 px-3 bg-red-500 text-white font-bold ml-1", content === 3 ? 'bg-yellow-500' : '')}>Đánh giá</button>
            </div>
            {(() => {
                if(content === 1) {
                    return ( <div className="border p-3"  dangerouslySetInnerHTML={{ __html: props.description }}></div> )
                } else if(content === 2) {
                    return ( <div className="border p-3">Hướng dẫn</div> )
                } else if (content === 3) {
                    return ( <div className="border p-3">Đánh giá</div> )
                }
            }) ()}
        </div>
     );
}

export default DetailDes;