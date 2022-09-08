import { useEffect } from "react";
import CompProductInfoImg from "./CompProductInfo/CompProductInfoImg";
import CompProductInfoTitle from "./CompProductInfo/CompProductInfoTitle";
import CompProductInfoPrice from "./CompProductInfo/CompProductInfoPrice";
import CompProductInfoDes from "./CompProductInfo/CompProductInfoDes";
import CompProductInfoIntro from "./CompProductInfo/CompProductInfoIntro";
import CompProductInfoIntroDetail from "./CompProductInfo/CompProductInfoIntroDetail";

function CompProductInfo(props) {
    useEffect(() => {
            document.title = props.title
        
        window.scrollTo(0, 0)
      }, [])
    return (
        <div style={{margin: "0 130px"}}>
            <CompProductInfoTitle
                title = {props.title}
            />
            <div style = {{display: "flex", justifyContent: "space-between"}}>
                <CompProductInfoImg
                    img = {props.img}
                />
                <CompProductInfoPrice
                    price = {props.price}
                    cost = {props.cost}
                />
                <CompProductInfoDes/>
            </div>

            <div  style = {{display: "flex"}}>
                <CompProductInfoIntro
                    des={props.des}
                />
                <br/>
                <CompProductInfoIntroDetail
                    inf={props.inf}
                />
            </div>
            <br/>
        </div>
    )
}

export default CompProductInfo;