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
    const state = useSelector((state) => {
        return state.item;
    });
    // const info = localStorage.getItem('infomation').split(",");
    const [subkey, setSubkey] = useState(localStorage.getItem('store-subkey'));
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
    localStorage.setItem('store-nfomation', infomation);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch('http://localhost:3000/' + subkey)
            .then((response) => response.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].title === title) {
                        document.title = data[i].title;
                        setTitle(data[i].title);
                        setImg(data[i].img);
                        setCost(data[i].cost);
                        setPrice(data[i].price);
                        setDescription(data[i].description);
                        setInfomation(data[i].infomation);
                        break;
                    }
                }
                console.log("Completed");
            })
            .catch((error) => {
                console.error(error);
            });
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
                <CompProductInfoIntroDetail info = {infomation} />
            </div>
            <br />
            <Outlet/>
        </div>
    );
}

export default CompProductInfo;
