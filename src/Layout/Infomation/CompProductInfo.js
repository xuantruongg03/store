import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import CompProductInfoDes from './CompProductInfo/CompProductInfoDes';
import CompProductInfoImg from './CompProductInfo/CompProductInfoImg';
import CompProductInfoIntro from './CompProductInfo/CompProductInfoIntro';
import CompProductInfoIntroDetail from './CompProductInfo/CompProductInfoIntroDetail';
import CompProductInfoPrice from './CompProductInfo/CompProductInfoPrice';
import CompProductInfoTitle from './CompProductInfo/CompProductInfoTitle';

function CompProductInfo(props) {
    const [title, setTitle] = useState();
    const [cost, setCost] = useState();
    const [img, setImg] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [infomation, setInfomation] = useState([]);
    const [quatity, setQuatity] = useState()

    const id = useSelector((state) => state.item.id_product);
    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`http://localhost:8000/api/v1/products/${id}`).then((res) => {
            const data = res.data.data;
            setTitle(data.product[0].tensanpham)
            setPrice(data.product[0].giaban)
            setCost(data.product[0].giaban)
            setDescription(data.product[0].mota)
            setImg(data.product[0].hinhanh)
            setDescription(data.product[0].mota)
            const detail = Object.values(data.detail[0]);
            detail.shift();
            setInfomation(detail);
            setQuatity(data.product[0].soluong)
        });
    }, [id]);
    return (
        <div style={{ margin: '0 130px' }}>
            <CompProductInfoTitle title={title} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CompProductInfoImg img={img} />
                <CompProductInfoPrice price={price} cost={cost} />
                <CompProductInfoDes quatity = {quatity}/>
            </div>

            <div style={{ display: 'flex' }}>
                <CompProductInfoIntro des={description} />
                <br />
                <CompProductInfoIntroDetail info={infomation} />
            </div>
            <br />
            <Outlet />
        </div>
    );
}

export default CompProductInfo;
