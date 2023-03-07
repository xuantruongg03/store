import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { getProductById } from '../../api/products';
import style from './CompProductInfo.module.scss';
import CompProductInfoPrice from './CompProductInfo/CompProductInfoPrice';

function CompProductInfo() {
    const [title, setTitle] = useState();
    const [cost, setCost] = useState();
    const [img, setImg] = useState();
    const [allImages, setAllImages] = useState([]);
    const [price, setPrice] = useState();
    const [sale, setSale] = useState();
    const [description, setDescription] = useState();
    const [details, setDetails] = useState([]);
    const [quatity, setQuatity] = useState();
    const [isShow, setIsshow] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('search');

    useEffect(() => {
        window.scrollTo(0, 0);
        const getInf = async () => {
            const { data } = await getProductById(id);
            setTitle(data[0].product_name);
            setPrice(data[0].product_price - (data[0].product_sale_price / 100) * data[0].product_price);
            setSale(Number(data[0].product_sale_price).toFixed());
            setCost(data[0].product_price);
            setDescription(data[0].product_description);
            setImg(data[0].product_images[0].file_path);
            setAllImages(data[0].product_images);
            setDetails(data[0].product_details);
            setQuatity(data[0].product_quantity);
            setLoading(false);
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

    const handleChooseImage = (e) => {
        setImg(e.target.src);
    };

    const property = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        // arrows: true,
    };
    
    if (loading) {
        return <div className='box-loader'><span className="loader"></span></div>;
    }

    return (
        <div style={{ margin: '0 130px' }}>
            <h2 className={style.titleProduct}>{title}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px' }}>
                <div>
                    <div className={style.boxMini}>
                        <img src={img || allImages[0].file_path} alt="Hình ảnh sản phẩm" className={style.img} />
                    </div>
                    <Slider {...property} className={style.boxMiniImage}>
                        {allImages.map((element) => {
                            return (
                                <img
                                    key={element.image_id}
                                    src={element.file_path}
                                    alt="img"
                                    className={clsx(style.imageMini, element.file_path === img ? style.activeImage : "")}
                                    onClick={handleChooseImage}
                                />
                            );
                        })}
                    </Slider>
                </div>
                <CompProductInfoPrice price={price} cost={cost} quatity={quatity} id={id} sale={sale} />
            </div>

            <div style={{ display: 'flex', marginTop: '10px' }}>
                <div className={style.boxDes}>
                    <h1 className={style.labelDes}>Giới thiệu sản phẩm</h1>
                    <div dangerouslySetInnerHTML={{ __html: description }} className={style.des} />
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
