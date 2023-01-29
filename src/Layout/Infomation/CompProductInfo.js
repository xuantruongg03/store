import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getProductById } from '../../api/products';
import style from './CompProductInfo.module.scss';
import CompProductInfoPrice from './CompProductInfo/CompProductInfoPrice';

function CompProductInfo(props) {
    const [title, setTitle] = useState();
    const [cost, setCost] = useState();
    const [img, setImg] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [infomation, setInfomation] = useState([]);
    const [quatity, setQuatity] = useState();
    const id = useSelector((state) => state.item.id_product);

    useEffect(() => {
        window.scrollTo(0, 0);
        const getInf = async () => {
            const response = await getProductById(id)
            const data = response.data;
            setTitle(data.product[0].tensanpham);
            setPrice(data.product[0].giaban);
            setCost(data.product[0].giaban);
            setDescription(data.product[0].mota);
            setImg(data.product[0].hinhanh);
            setDescription(data.product[0].mota);
            const detail = Object.values(data.detail[0]);
            detail.shift();
            setInfomation(detail);
            setQuatity(data.product[0].soluong);
        }
        getInf();
    }, [id]);

    return (
        <div style={{ margin: '0 130px' }}>
            <h2 className={style.titleProduct}>{title}</h2>
            <div style={{ display: 'flex', justifyContent: "space-around" }}>
                <img src={img} alt="Hình ảnh sản phẩm" className={style.img} />
                <CompProductInfoPrice price={price} cost={cost} quatity={quatity} id={id}/>
            </div>

            <div style={{ display: 'flex' }}>
                <div className={style.boxDes}>
                    <p className={style.des}>{description}</p>
                    <br />
                </div>
                <br />

                <div className={style.detail}>
                    <p className={style.title}>Thông số kỹ thuật</p>
                    <ul className={style.ul}>
                        <li className={style.li}>
                            <span className={style.lable}>CPU: </span>
                            <span className={style.inf}>{infomation[0]}</span>
                        </li>
                        <li className={style.li}>
                            <span className={style.lable}>RAM: </span>
                            <span className={style.inf}>{infomation[1]}</span>
                        </li>
                        <li className={style.li}>
                            <span className={style.lable}>ROM: </span>
                            <span className={style.inf}>{infomation[2]}</span>
                        </li>
                        <li className={style.li}>
                            <span className={style.lable}>Màn hình: </span>
                            <span className={style.inf}>{infomation[3]}</span>
                        </li>
                        <li className={style.li}>
                            <span className={style.lable}>GPU: </span>
                            <span className={style.inf}>{infomation[4]}</span>
                        </li>
                        <li className={style.li}>
                            <span className={style.lable}>Hệ điều hành: </span>
                            <span className={style.inf}>{infomation[5]}</span>
                        </li>
                        <li className={style.li}>
                            <span className={style.lable}>Cổng kết nối: </span>
                            <span className={style.inf}>{infomation[6]}</span>
                        </li>
                        <li className={style.li}>
                            <span className={style.lable}>Thiết kế: </span>
                            <span className={style.inf}>{infomation[7]}</span>
                        </li>
                        <li className={style.li}>
                            <span className={style.lable}>Năm sản xuất: </span>
                            <span className={style.inf}>{infomation[8]}</span>
                        </li>
                    </ul>

                    <button className={style.btn}>Xem đầy đủ</button>
                </div>
            </div>
            <br />
            <Outlet />
        </div>
    );
}

export default CompProductInfo;
