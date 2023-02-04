import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProductById } from '../../api/products';
import style from './CompProductInfo.module.scss';
import CompProductInfoPrice from './CompProductInfo/CompProductInfoPrice';

function CompProductInfo(props) {
    const [title, setTitle] = useState();
    const [cost, setCost] = useState();
    const [img, setImg] = useState();
    const [price, setPrice] = useState();
    const [sale, setSale] = useState();
    const [description, setDescription] = useState();
    const [details, setDetails] = useState([]);
    const [quatity, setQuatity] = useState();
    const [isShow, setIsshow] = useState(false);
    const id = useSelector((state) => state.item.product_id);

    useEffect(() => {
        window.scrollTo(0, 0);
        const getInf = async () => {
            const response = await getProductById(id);
            const data = response.data;
            setTitle(data[0].product_name);
            setPrice(data[0].product_price - (data[0].product_sale_price / 100) * data[0].product_price);
            setSale(Number(data[0].product_sale_price).toFixed());
            setCost(data[0].product_price);
            setDescription(data[0].product_description);
            setImg(data[0].product_images[0].file_path);
            setDetails(data[0].product_details);
            setQuatity(data[0].product_quantity);
        };
        getInf();
    }, [id]);

    const hanldeShowMoreDetails = (e) => {
        if (e.target.innerText === 'Xem đầy đủ') {
            e.target.innerText = 'Thu gọn';
        } else {
            e.target.innerText = 'Xem đầy đủ';
        }
        setIsshow(!isShow);
    };

    return (
        <div style={{ margin: '0 130px' }}>
            <h2 className={style.titleProduct}>{title}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: "10px"}}>
                <img src={img} alt="Hình ảnh sản phẩm" className={style.img} />
                <CompProductInfoPrice price={price} cost={cost} quatity={quatity} id={id} sale={sale}/>
            </div>

            <div style={{ display: 'flex', marginTop: "10px"}}>
                <div className={style.boxDes}>
                    <h1 className={style.labelDes}>Giới thiệu sản phẩm</h1>
                    <p className={style.des}>{description}</p>
                    <br />
                </div>
                <br />

                <div className={style.detail}>
                    <p className={style.title}>Thông số kỹ thuật</p>
                    <ul className={style.ul}>
                        {details.slice(0, 7).map((element) => {
                            return (
                                <li className={style.li} key={element.detail_id}>
                                    <span className={style.lable}>{element.detail_name}: </span>
                                    <span className={style.value}>{element.detail_value}</span>
                                </li>
                            );
                        })}
                    </ul>
                    {isShow ? (
                        <div>
                            <ul className={style.ul}>
                                {details.slice(7, details.length).map((element) => {
                                    return (
                                        <li className={style.li} key={element.detail_id}>
                                            <span className={style.lable}>{element.detail_name}: </span>
                                            <span className={style.value}>{element.detail_value}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ) : null}
                    <button className={style.btn} onClick={hanldeShowMoreDetails} id="text">
                        Xem đầy đủ
                    </button>
                </div>
            </div>
            <br />
        </div>
    );
}

export default CompProductInfo;
