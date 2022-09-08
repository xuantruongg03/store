import { Routes, Route, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';

// import formatsMoney from './Convert/ConvertMoneyVND';
import slug from './Convert/ConvertStringVNtoTitle';

import CompHeader from './components/Header/CompHeader.js';
import CompFooter from './components/CompFooter/CompFooter';
import CompProductInfo from './Layout/Infomation/CompProductInfo';
import NoPage from './NoPage';
import Home from './Layout/Home/Home';
import Products from './Layout/Products/Products';
import Cart from './Layout/Cart/Cart';
import Pay from './Layout/Pay/Pay';
import PayComplete from './Layout/PayComplete/PayComplete';

function App() {
    // state info
    const [title, setTitle] = useState(localStorage.getItem('title'));
    const [img, setImg] = useState(localStorage.getItem('img'));
    const [price, setPrice] = useState(localStorage.getItem('price'));
    const [cost, setCost] = useState(localStorage.getItem('cost'));
    const [des, setDes] = useState(localStorage.getItem('des'));
    const [inf, setInf] = useState(localStorage.getItem('inf'));

    // lưu thông vào localStorage tránh reload mất
    localStorage.setItem('title', title);
    localStorage.setItem('img', img);
    localStorage.setItem('price', price);
    localStorage.setItem('cost', cost);
    localStorage.setItem('des', des);
    localStorage.setItem('inf', inf);

    const [sale, setSale] = useState([]);
    const [computer, setComputer] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/productSale')
            .then((response) => response.json())
            .then((data) => {
                setSale(data);
            })
            .catch((error) => {
                console.error(error);
            });

        fetch('http://localhost:3000/productComputer')
            .then((response) => response.json())
            .then((data) => {
                setComputer(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <div className="App">
            <CompHeader/>
            <Routes>
                <Route
                    path="/"
                    index
                    element={
                        <Home
                            sale={sale}
                            computer={computer}
                            setTitle={setTitle}
                            setImg={setImg}
                            setPrice={setPrice}
                            setCost={setCost}
                            setDes={setDes}
                            setInf={setInf}
                        />
                    }
                />

                <Route
                    path={slug('sản phẩm khuyến mãi')}
                    element={
                        <div style={{ marginTop: '10px' }}>
                            <Products
                                subTitle="Sản phẩm khuyến mãi"
                                listProducts={sale}
                                setTitle={setTitle}
                                setImg={setImg}
                                setPrice={setPrice}
                                setCost={setCost}
                            />
                        </div>
                    }
                />
                <Route
                    path={slug(title) || ':list/' + slug(title)}
                    element={<CompProductInfo title={title} img={img} price={price} cost={cost} des={des} inf={inf} />}
                />
                <Route path="cart" element={<Cart/>} />

                <Route path="pay" element={<Pay />} />

                <Route path="paycomplete" element={<PayComplete />} />

                <Route path="*" element={<NoPage />} />
            </Routes>

            <CompFooter className="disabled" />
        </div>
    );
}

export default App;
