import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CompProductInfoDes from './CompProductInfo/CompProductInfoDes';
import CompProductInfoImg from './CompProductInfo/CompProductInfoImg';
import CompProductInfoIntro from './CompProductInfo/CompProductInfoIntro';
import CompProductInfoIntroDetail from './CompProductInfo/CompProductInfoIntroDetail';
import CompProductInfoPrice from './CompProductInfo/CompProductInfoPrice';
import CompProductInfoTitle from './CompProductInfo/CompProductInfoTitle';

function CompProductInfo(props) {
    const state = useSelector((state) => state.item);
    const [title, setTitle] = useState(localStorage.getItem('store-title'));
    const [cost, setCost] = useState(localStorage.getItem('store-cost'));
    const [img, setImg] = useState(localStorage.getItem('store-img'));
    const [price, setPrice] = useState(localStorage.getItem('store-price'));
    const [description, setDescription] = useState(localStorage.getItem('store-description'));
    const [infomation, setInfomation] = useState([]);

    localStorage.setItem('store-title', title);
    localStorage.setItem('store-price', price);
    localStorage.setItem('store-description', description);
    localStorage.setItem('store-cost', cost);
    localStorage.setItem('store-img', img);
    localStorage.setItem('store-infomation', infomation);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTitle(state.title);
        setCost(state.cost);
        setImg(state.img);
        setPrice(state.price);
        setDescription(state.des);
        setInfomation(state.inf);
    }, []);
    return (
        <div style={{ margin: '0 130px' }}>
            <CompProductInfoTitle title={title} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CompProductInfoImg img={img} />
                <CompProductInfoPrice price={price} cost={cost} />
                <CompProductInfoDes />
            </div>

            <div style={{ display: 'flex' }}>
                <CompProductInfoIntro des={description} />
                <br />
                <CompProductInfoIntroDetail info={infomation} />
            </div>
            <br />
        </div>
    );
}

export default CompProductInfo;
