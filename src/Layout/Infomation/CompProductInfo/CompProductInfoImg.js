import style from "./CompProductInfoImg.module.scss"
function CompProductInfoImg(props) {
    return (
        <div>
            <img src={props.img} alt="Image" className={style.img}/>
        </div>
    )
}

export default CompProductInfoImg;