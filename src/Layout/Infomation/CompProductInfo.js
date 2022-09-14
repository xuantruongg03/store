import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

    const [title, setTitle] = useState(localStorage.getItem('title'));
    const [cost, setCost] = useState(localStorage.getItem('cost'));
    const [img, setImg] = useState(localStorage.getItem('img'));
    const [price, setPrice] = useState(localStorage.getItem('price'));
    const [description, setDescription] = useState(localStorage.getItem('description'));
    const [infomation, setInfomation] = useState(localStorage.getItem('infomation'));

    localStorage.setItem('title', title);
    localStorage.setItem('price', price);
    localStorage.setItem('description', description);
    localStorage.setItem('cost', cost);
    localStorage.setItem('img', img);
    localStorage.setItem('infomation', infomation);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch('http://localhost:3000/' + state.subkey)
            .then((response) => response.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].title === state.title) {
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
                <CompProductInfoIntroDetail  />
            </div>
            <br />
        </div>
    );
}

export default CompProductInfo;
