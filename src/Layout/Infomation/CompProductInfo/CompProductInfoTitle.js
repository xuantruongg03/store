import styleTitle from "./ComProductInfoTitle.module.scss";

function CompProductInfoTitle(props) {
    return (
        <div>
            <h2 className = {styleTitle.title}>{props.title}</h2>
        </div>
    )
}

export default CompProductInfoTitle;